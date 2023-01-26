import React from "react";
import { View, FlatList, RefreshControl } from 'react-native';
import { ScreenProps } from "../../../interfaces/ScreenPropsInterface";
import { IOrder } from "../types/types";
import Order from "./Order";
import { withTheme } from "react-native-paper";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { User } from "../../../store/interfaces/ReducersInterfaces";
import API from "../../../api/API";

type OrdersProps = ScreenProps & { navigation: { navigate: (screen: string) => void }; user: User };
type OrdersState = {orders: Array<IOrder>; isLoading: boolean};

class Orders extends React.Component<OrdersProps, OrdersState> {

    public state: Readonly<OrdersState>;
    private api: API;

    constructor(props: OrdersProps) {
        super(props);
        this.state = {
            orders: [],
            isLoading: false
        };
        this.api = new API();
    }

    loadOrders = async () => {

        this.setState({ isLoading: true });

        const { user } = this.props;
    
        const response = await this.api.get(`orders/users/${user.customerId}?page=1`, user.accessToken);

        console.log("response", response)

        if(response.data !== undefined){
            this.setState({ 
                orders: response.data.map((order: any) => {
                    return {
                        id: order.id,
                        createdAt: order.created_at,
                        status: {
                            id: order.status,
                            name: order.status_name
                        },
                        number: order.number,
                        amount: order.usd_amount,
                        deliveryFees: order.usd_delivery_fees,
                        payMode: order.pay_mode_name,
                        isPaid: order.payment.is_paid,
                        deliveryAddress: {
                            reference: order.delivery_address.reference
                        },
                        notes: order.notes,
                        items: order.items.map((item: any) => {
                            return {
                                amount: item.amount,
                                usdAmount: item.usd_amount,
                                cdfAmount: item.cdf_amount,
                                name: item.item_name,
                                salePointName: item.sale_point_name,
                                quantity: item.quantity
                            }
                        })
                    }
                }) 
            });
        }

        this.setState({ isLoading: false });
    
    }

    componentDidMount(): void {
        this.loadOrders();
    }
    

    render(){

        const { navigation } = this.props;

        return(
            <FlatList
                data={this.state.orders}
                renderItem={({ item }) => (
                    <Order 
                        key={item?.id} 
                        order={item} 
                        navigation={navigation}
                    />
                )}
                style={{ marginBottom: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.loadOrders()}
                    />
                }
            />
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(withTheme(Orders));
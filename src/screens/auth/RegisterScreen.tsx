import React from "react";
import { View, StyleSheet, StatusBar, ImageBackground, BackHandler } from 'react-native';
import { withTheme, Card, Button, Text, TextInput, HelperText } from "react-native-paper";
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { ScreenProps } from "../../interfaces/ScreenPropsInterface";
import { RegisterScreenState, ErrorState } from "../../interfaces/AuthInterface";
import appTheme from "../../theme/appTheme";
import { RootState } from "../../store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/RootStackParamList";
import AuthService from "../../services/AuthService";
import { User } from "../../store/interfaces/ReducersInterfaces";
import { withUseTranslation } from "../../hoc/withUseTranslation";
import ScreenNavBar from "../../components/ScreenNavBar";

type RegisterVerificationProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

class RegisterScreen extends React.Component<RegisterVerificationProps & ScreenProps, RegisterScreenState & ErrorState>{

    public state: Readonly<RegisterScreenState & ErrorState>;
    private authService: AuthService;

    constructor(props: RegisterVerificationProps & ScreenProps){
        super(props);
        this.state = {
            phone: '',
            username: '',
            email: '',
            isLoading: false,
            isShow: false,
            errorMessage: "",
            errors: []
    
        };
        this.authService = new AuthService();
    }

    register = async () =>{

        this.setState({ isLoading: true})

        const { phone, username, email } = this.state;

        const user = {
            phone: phone,
            name: username,
            email: email,
            password: '12345678',
            role_id: 3,
        };

        const response: { status: boolean, user: User } | any = await this.authService.register(user);

        if(response.status !== undefined && response.status == true){

            this.props.navigation.navigate('OTPVerificationScreen', {phone: user.phone});

            return null;
        }

        this.setState({isLoading: false});

        Array.isArray(response?.errors) ? this.setState({ errors: response?.errors }) : this.setState({ errors: [response.errors] });
        typeof response?.errors === 'string' && this.setState({ errorMessage: response.errors });
        
    }

    onBackHandler = () => {
        BackHandler.exitApp();
        return true;
    }

    componentDidMount(){
        // this.backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     this.onBackHandler
        // );

        this.setState({ phone: this.props.route.params.phone });
    }

    componentWillUnmount() {
        // this.backHandler.remove();
    }

    render(){

        const { theme, translation, navigation } = this.props;

        return(
            <View style={styles(theme).container}>
                <StatusBar backgroundColor={theme.colors.primary} /> 
                
                <Card style={styles(theme).card}>
                    <ImageBackground 
                        source={!theme.dark ? require('../../../assets/images/bg/onboarding.jpg') : require('../../../assets/images/bg/bg-dark.jpg')}
                        style={{ width: "100%", height: "106%" }}>

                        <ScreenNavBar screenName="register" navigation={navigation} icon="account-plus-outline" />
                        
                        <View style={{ padding: 13 }}>
                            <TextInput
                                label={`${ translation?.t('messages.firstName') } ${ translation?.t('messages.and') } ${ translation?.t('messages.lastName') }`}
                                mode="outlined"
                                value={this.state.username}
                                onChangeText={text => this.setState({ username: text })}
                            />
                            <Text></Text>
                            <TextInput
                                label={`${ translation?.t('messages.email') }(${ translation?.t('messages.not') } ${ translation?.t('messages.required') })`}
                                mode="outlined"
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <Text></Text>
                            {
                                this.state.errors?.map((error, index) => {
                                    return(
                                        <HelperText key={index} type="error" visible={true}>
                                            { error.message }
                                            <HelperText type="error" visible={true}>{ error.sqlMessage }</HelperText>
                                            <HelperText type="error" visible={true}>{ this.state.errorMessage }</HelperText>
                                        </HelperText>
                                    )
                                })
                            }
                            <Text></Text>
                            <Text></Text>
                            <View>
                                <Button
                                    icon="login" 
                                    mode="contained"
                                    style={{ marginTop: -25, padding: 6,backgroundColor:theme.colors.primary }} 
                                    labelStyle={{ color: "#fff" }}
                                    loading={this.state.isLoading}
                                    disabled={this.state.username == null && true}
                                    onPress={() => this.register() }>
                                    { translation?.t('messages.confirm') }

                                </Button>
                            </View>
                        </View>
                    </ImageBackground>
                </Card>
            </View>
        );
    }
}

const styles = (theme: ReturnType<typeof appTheme>) => StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: theme.colors.primary,
     
    },
    bgImage: {
        width: "100%", 
        height: "105%",
    },
    card: {
        borderBottomLeftRadius: 22, 
        borderBottomRightRadius: 22,
        height: "93%",
        overflow: 'hidden',
        marginTop: Constants.statusBarHeight
    },
    header: {
        width: "100%",
        height: 80,
        backgroundColor: theme.colors.primary,
        flexDirection: "row"
    }
  });

  const mapStateToProps = (state: RootState) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(withTheme(withUseTranslation(RegisterScreen)));
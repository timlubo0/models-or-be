import React from "react";
import ConfirmInput from "../../components/ConfirmInput";
import { View, StyleSheet, StatusBar, ImageBackground, BackHandler } from 'react-native';
import { withTheme, Card, Button, Text, HelperText } from "react-native-paper";
import { connect } from 'react-redux';
import CircleCountDown from "../../components/CircleCountDown";
import Constants from 'expo-constants';
import { OTPScreenState, ErrorState } from "../../interfaces/AuthInterface";
import appTheme from "../../theme/appTheme";
import { AppDispatch, RootState } from "../../store/store";
import { ScreenProps } from "../../interfaces/ScreenPropsInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/RootStackParamList";
import { UserActionType } from "../../store/reducers/userReducer";
import AuthService from "../../services/AuthService";
import { User } from "../../store/interfaces/ReducersInterfaces";
import { withUseTranslation } from "../../hoc/withUseTranslation";
import ScreenNavBar from "../../components/ScreenNavBar";

type OTPVerificationProps = NativeStackScreenProps<RootStackParamList, 'OTPVerificationScreen'> & {dispatch: AppDispatch};

class OTPVerificationScreen extends React.Component<OTPVerificationProps & ScreenProps, OTPScreenState & ErrorState>{

    public state: Readonly<OTPScreenState & ErrorState>;
    private authService: AuthService;

    constructor(props: OTPVerificationProps & ScreenProps){
        super(props);
        this.state = {
            otpCode: '',
            isLoading: false,
            isResendLoading: false,
            isShow: false,
            errorMessage: "",
            isResendDisabled: true,
            errors: []
        };

        this.authService = new AuthService();
    }
   
    authenticate = async () =>{
     

        this.setState({ isLoading:true})

        const newPhone: string | undefined = this.props.route.params.newPhone;
        
        const response: {status: boolean; user: User} | any = await this.authService.authenticate(this.props.route.params.phone, this.state.otpCode, newPhone);

        if(response.status !== undefined && response.status == true){

            const action = { type: UserActionType.REGISTER_USER, value:  response.user };
            this.props.dispatch(action);

            this.props.navigation.navigate('HomeScreen');
            
            return null;
        }

        this.setState({ isLoading: false });

        Array.isArray(response?.errors) ? this.setState({ errors: response?.errors }) : this.setState({ errors: [response.errors] });
        typeof response?.errors === 'string' && this.setState({ errorMessage: response.errors });

    }

    resendOtpCode = async () =>{

        this.setState({ isResendLoading: true });

        const credentials = {
            phone: this.props.route.params.phone
        };

        this.setState({ isResendLoading: false });
        
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
    }

    componentWillUnmount() {
        //this.backHandler.remove();
    }

    render(){

        const { theme, navigation, translation } = this.props;

        return(
            <View style={styles(theme).container}>
                <StatusBar backgroundColor={theme.colors.primary} /> 
                
                <Card style={styles(theme).card}>
                    <ImageBackground 
                        source={!theme.dark ? require('../../../assets/images/bg/onboarding.jpg') : require('../../../assets/images/bg/bg-dark.jpg')}
                        style={{ width: "100%", height: "106%" }}>

                        <ScreenNavBar screenName="otp" navigation={navigation} icon="check-circle-outline" />

                        <View style={{ padding: 13 }}>
                            <ConfirmInput
                                code={this.state.otpCode} 
                                onCodeChange={(code: unknown) => this.setState({ otpCode: String(code) })}
                                theme={theme}
                            />
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>

                            <View>
                            
                                <Button
                                    icon="check-circle-outline" 
                                    mode="contained"
                                    loading={this.state.isLoading}
                                    disabled={this.state.otpCode !== null && this.state.otpCode.length == 5 && this.state.isLoading == false ? false : true}
                                    style={{ marginTop: -25, padding: 6,backgroundColor:theme.colors.primary }}
                                    onPress={() => this.authenticate() }>
                                    { translation?.t('messages.confirm') }

                                </Button>

                                {
                                    this.state.errors?.map((error, index) => {
                                        return(
                                            <HelperText key={index} type="error" visible={true}>
                                                { error.message }
                                                <HelperText type="error" visible={true}>{ error.sqlMessage }</HelperText>
                                                <HelperText type="error" visible={true}>{ error.responseText }</HelperText>
                                            </HelperText>
                                        )
                                    })
                                }

                                <View style={{ marginTop:50 }}>
                                    <Text style={{ textAlign: "center" , color: theme.dark ? "#000" : theme.colors.text}}>{ translation?.t('messages.screens.otp.noOTP') } ? </Text>
                                </View>
                                <Text></Text>
                                <View style={{ alignItems: "center" }}>
                                    <CircleCountDown 
                                        props={this.props} 
                                        duration={45} 
                                        onCountDown={() => this.setState({ isResendDisabled: false })}/>
                                </View>
                                <Text></Text>
                                <Button 
                                    mode="outlined"
                                    color={theme.colors.accent}
                                    style={{ marginTop: 25, borderColor: theme.colors.accent }} 
                                    disabled={this.state.isResendDisabled}
                                    loading={this.state.isResendLoading}
                                    onPress={() => this.resendOtpCode()}>
                                    { translation?.t('auth.resendOTP') }
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
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(withTheme(withUseTranslation(OTPVerificationScreen)));
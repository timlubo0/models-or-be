export type RootStackParamList = {
    SplashScreen: undefined;
    OnBoardingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: {phone: string};
    OTPVerificationScreen: {phone: string, newPhone?: string};
    ChangePhoneNumberScreen: undefined;
    HomeScreen: undefined;
    AccountScreen: undefined;
    LanguagePickerScreen: undefined;
}

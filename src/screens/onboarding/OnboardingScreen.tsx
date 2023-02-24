import React from "react";
import { View, StyleSheet, StatusBar, BackHandler} from "react-native";
import { withTheme } from "react-native-paper";
import Onboarding from "./components/Onboarding";
import { OnboardingScreenState } from "../../interfaces/OnboardingInterface";
import appTheme from "../../theme/appTheme";
import { ScreenProps } from "../../interfaces/ScreenPropsInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/RootStackParamList";
import { withUseTranslation } from "../../hoc/withUseTranslation";

type OnBoardingScreenProps = NativeStackScreenProps<RootStackParamList, 'OnBoardingScreen'>;

class OnBoardingScreen extends React.Component<OnBoardingScreenProps & ScreenProps, OnboardingScreenState>{

    public state: Readonly<OnboardingScreenState>;

    constructor(props: OnBoardingScreenProps & ScreenProps){
        super(props);
        this.state = {
            activeScreen: 0,
            screens: {
                first: {
                    title: 'Discover Models or Be',
                    description: 'A Platform that provides many kinds of the best and most trusted fashion',
                    illustration: "",
                }
            }
        }
    }

    onNext = (screenIndex: number) => { 
        screenIndex !== 3 && this.setState({ activeScreen: screenIndex });
        screenIndex === 3 && this.props.navigation.navigate("LoginScreen");
    }

    renderActiveScreen = (screenIndex: number) => {

        let nextScreen: unknown;

        switch (screenIndex) {
            case 0:
                nextScreen = <Onboarding 
                    title={this.state.screens.first.title}
                    description={this.state.screens.first.description}
                    illustration={this.state.screens.first.illustration}
                    active={0}
                    navigation={this.props.navigation}
                    onNext={this.onNext} />
                break;
        
            case 1:
                nextScreen = <Onboarding 
                    title={this.state.screens.second.title}
                    description={this.state.screens.second.description}
                    illustration={this.state.screens.second.illustration}
                    active={1}
                    navigation={this.props.navigation}
                    onNext={this.onNext} />
                break;
        
            case 2:
                nextScreen = <Onboarding 
                    title={this.state.screens.third.title}
                    description={this.state.screens.third.description}
                    illustration={this.state.screens.third.illustration}
                    active={2}
                    navigation={this.props.navigation}
                    onNext={this.onNext} />
                break;
        
            default:
                break;
        }

        return nextScreen;

    }

    onBackHandler = () => {
        BackHandler.exitApp();
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.onBackHandler
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
    }

    render(){
        const { theme } = this.props;

        return(
            <View style={styles(theme).container}>
                <StatusBar backgroundColor={theme.colors.accent} />
                <>
                    {this.renderActiveScreen(this.state.activeScreen)}
                </>
            </View>
        )
    }

}

const styles = (theme: ReturnType<typeof appTheme>) => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    }
});

export default withTheme(withUseTranslation(OnBoardingScreen));
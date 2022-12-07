import React from "react";
import { View, StyleSheet, StatusBar, BackHandler } from 'react-native';
import { withTheme, Text, Button } from "react-native-paper";
import { ScreenProps } from "../../interfaces/ScreenPropsInterface";
import appTheme from "../../theme/appTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/RootStackParamList";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { Preferences, User } from "../../store/interfaces/ReducersInterfaces";
import { withUseTranslation } from "../../hoc/withUseTranslation";
import { UseTranslationResponse } from "react-i18next";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'> & { user: User; preferences: Preferences };

class HomeScreen extends React.Component<HomeScreenProps & ScreenProps>{

    public state: Readonly<{}>;

    constructor(props: HomeScreenProps & ScreenProps){
        super(props);
        this.state = {
        }
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
        console.log(this.props.preferences)
    }

    componentWillUnmount() {
        //this.backHandler.remove();
    }

    render(){

        const { theme, translation } = this.props;

        return(
            <View style={styles(theme).container}>
                <StatusBar backgroundColor={theme.colors.primary} /> 
                <Text>{translation?.t('messages.screens.home.title')}</Text>
                <Button 
                    mode="contained"
                    color={theme.colors.primary}
                    style={{ width: "70%", borderRadius: 20, padding: 6 }} 
                    onPress={() => this.props.navigation.navigate('AccountScreen')}>
                    {translation?.t('messages.screens.account.title')}
                </Button>
            </View>
        );
    }
}

const styles = (theme: ReturnType<typeof appTheme>) => StyleSheet.create({
    container: {
      flex: 1,
    }
});

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.user,
        preferences: state.preferences.preferences
    }
};


export default connect(mapStateToProps)(withUseTranslation(withTheme(HomeScreen)));
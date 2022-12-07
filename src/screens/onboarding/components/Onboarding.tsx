import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import { withTheme, Card, Text, Button, Paragraph, Title } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
const appConfig = require('../../../../app.json');
import { OnboardingProps } from "../../../interfaces/OnboardingInterface";
import appTheme from "../../../theme/appTheme";
import { ScreenProps } from "../../../interfaces/ScreenPropsInterface";
import { withUseTranslation } from "../../../hoc/withUseTranslation";

type OnBoardingProps = ScreenProps & OnboardingProps;

class OnBoarding extends React.Component<OnBoardingProps, {activeIndex: number}>{

    public state: Readonly<{ activeIndex: number; }>;

    constructor(props: OnBoardingProps){
        super(props);
        this.state = {
            activeIndex:0,
        }
    }

    render(){
        const { theme, illustration, title, description, active, onNext, navigation, translation } = this.props;

        return(
            <View>
                <Card style={styles(theme).card}>
                    <ImageBackground  source={require("../../../../assets/images/bg/onboarding.jpg")} style={styles(theme).bgImage}>
                        <Animatable.View
                            animation="fadeInRight"
                            duration={500}>
                            <View style={{ alignItems: "center" }}>
                                <Image 
                                    source={illustration}
                                    style={{margin: -80, resizeMode: 'contain', height: 600}}
                                />
                                <Title style={{ marginTop: -80, fontWeight: "bold", color: '#091E58' }}>{title}</Title>
                                <Paragraph style={{ textAlign:"center", padding: 25, color: theme.dark ? "#000" : theme.colors.text }}>{description}</Paragraph>
                                
                            </View>
                            
                        </Animatable.View>

                        <View style={{ alignItems: 'center', paddingVertical: 25 }}>
                            <Button 
                                mode="contained"
                                color={theme.colors.primary}
                                style={{ width: "70%", borderRadius: 20, marginTop: -25, padding: 6 }} 
                                onPress={() => navigation.navigate("LoginScreen")}>
                                {  translation?.t('messages.getStarted') }
                            </Button>
                        </View>

                        <Text style={ styles(theme).appNameText }>{appConfig.expo.name}</Text>
                    </ImageBackground>
                </Card>
                
            </View>
        )
    }

}

const styles = (theme: ReturnType<typeof appTheme>) => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
    card: {
        paddingBottom: '20%',
        borderBottomLeftRadius: 22, 
        borderBottomRightRadius: 22,
        height: "100%",
        overflow: 'hidden'
    },
    appNameText: {
        color: theme.colors.text,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 25,
    },
    bgImage: {
        width: "100%", 
        height: "108%",
        resizeMode: 'cover'
    },

});

export default withTheme(withUseTranslation(OnBoarding));
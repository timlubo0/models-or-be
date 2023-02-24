import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { withTheme, Card, Text, Button, Paragraph, Title, FAB, Avatar, Divider, IconButton } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import { OnboardingProps } from "../../../interfaces/OnboardingInterface";
import appTheme from "../../../theme/appTheme";
import { ScreenProps } from "../../../interfaces/ScreenPropsInterface";
import { withUseTranslation } from "../../../hoc/withUseTranslation";
import Dots from "../../../components/Dots";

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
        const { theme, title, description } = this.props;

        return(
            <View style={{ flex: 1 }}>
                <ImageBackground  source={require("../../../../assets/images/bg/onboarding.jpeg")} style={styles(theme).bgImage}>
                    <View style={{ width: '100%', height: 600, backgroundColor: '#000', opacity: 0.74 }} >
                        <IconButton
                            icon="chevron-left"
                            size={40}
                            style={{ marginTop: 35, marginLeft: -10 }}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <Animatable.View
                        animation="fadeInRight"
                        duration={500}>
                        <View style={{ flex: 1, alignItems: "center", marginTop: -540 }}>

                            <Avatar.Image 
                                size={125} 
                                source={require('../../../../assets/images/screens/onboarding/avatar.jpg')} />

                            <Title style={{ color: "#fff" }}>Lois Adjetey Annan</Title>

                            <View style={{ flex: 1, flexDirection: 'row', margin: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Title style={{ fontWeight: 'bold', color: '#fff' }}>137</Title>
                                    <Text>Projects</Text>
                                    <Divider style={{ transform: [{rotate: '-270deg'}], height: 2, width: 55, marginLeft: 55, marginTop: -25 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Title style={{ fontWeight: 'bold', color: '#fff' }}>124</Title>
                                    <Text>Followers</Text>
                                    <Divider style={{ transform: [{rotate: '-270deg'}], height: 2, width: 55, marginLeft: 55, marginTop: -25 }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button style={{ borderRadius: 20, marginTop: 10 }} mode="contained" onPress={() => console.log('Pressed')}>
                                        <Text>Follow</Text>
                                    </Button>
                                </View>
                            </View>
                            
                        </View>
                        
                    </Animatable.View>

                    <Card style={styles(theme).card}>
                        <View style={{ transform: [{rotate: "100deg"}], marginTop: 100, marginLeft: 235 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Title style={{  fontWeight: "bold", color: theme.colors.primary, textAlign: 'center' }}>{title}</Title>
                                <Button color="#24B6AD" style={{ width: 150 }} mode="contained" onPress={() => console.log('Pressed')}>
                                    <Text style={{ fontWeight: 'bold' }}>Discovered</Text>
                                </Button>

                                <Text />

                                <Paragraph>{ description }</Paragraph>

                                <View style={{ marginTop: 20, marginLeft: -70 }}>
                                    <FAB
                                        icon="arrow-right"
                                        style={styles(theme).fab}
                                        color="#fff"
                                        onPress={() => console.log('Pressed')}
                                    />
                                </View>

                                <View style={{ marginTop: 90 }}>
                                    <Dots value={3} active={2} />
                                </View>
                                
                            </View>
                        </View>
                    </Card>

                </ImageBackground>
                
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
        borderBottomRightRadius: 40,
        width: '150%', 
        height: 420, 
        backgroundColor: theme.colors.accent, 
        transform: [{rotate: '-100deg'}],
        marginTop: -120,
        marginLeft: -90
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
        resizeMode: 'contain',
    },
    fab: {
        position: 'absolute',
        padding: 3,
        backgroundColor: theme.colors.primary
    },
    skipButton: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        borderRadius: 15
    },

});

export default withTheme(withUseTranslation(OnBoarding));
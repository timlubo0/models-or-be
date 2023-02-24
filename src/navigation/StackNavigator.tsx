import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/RootStackParamList';
import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const RootStack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="SplashScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="OnBoardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

export default StackNavigator;
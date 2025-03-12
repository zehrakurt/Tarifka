import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Categories from './pages/Categories';
import Meals from './pages/Meals';
import MealDetail from './pages/MealDetail';
export default function Router() {

  const Stack = createNativeStackNavigator();

  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Categories}
          options={{title: 'Categories'}}
        />
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="MealDetail" component={MealDetail} options={{ title: "Meal Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


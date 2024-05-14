import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider } from "react-native-paper";
import { createClient } from "@supabase/supabase-js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { useState } from "react";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [user, setUser] = useState([]);

  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="tomato"
          barStyle={{ backgroundColor: "lightblue" }}
        >
          <Tab.Screen
            name="Home"
            children={() => <Home sb={supabase} />}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            children={() => <Search sb={supabase} user={user} />}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            children={() => (
              <Profile sb={supabase} user={user} setUser={setUser} />
            )}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

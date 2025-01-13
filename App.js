import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import screen components
import Start from "./components/Start";
import Chat from "./components/Chat";

// Create the stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase configuration for the project
  const firebaseConfig = {
    apiKey: "AIzaSyC_0O3723dommPFPdlUSmrbAelSMtI0wgI",
    authDomain: "chat-app-e89c5.firebaseapp.com",
    projectId: "chat-app-e89c5",
    storageBucket: "chat-app-e89c5.appspot.com",
    messagingSenderId: "600186927137",
    appId: "1:600186927137:web:uniqueappid"
  };

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen where users enter their name and preferences */}
        <Stack.Screen name="Start" component={Start} />
        {/* Chat screen with Firestore database passed as a prop */}
        <Stack.Screen
          name="Chat"
          children={(props) => <Chat {...props} db={db} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

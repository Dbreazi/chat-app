import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from "react-native";

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// Import NetInfo
import { useNetInfo } from "@react-native-community/netinfo";

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

  // Use NetInfo to track connectivity
  const connectionStatus = useNetInfo();

  // Effect to handle online/offline states
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen where users enter their name and preferences */}
        <Stack.Screen name="Start" component={Start} />
        {/* Chat screen with Firestore database and connection status passed as props */}
        <Stack.Screen
          name="Chat"
          children={(props) => (
            <Chat {...props} db={db} isConnected={connectionStatus.isConnected} />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import firestore connection
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Firebase Storage import
import { LogBox, Alert } from 'react-native';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

// Firebase Authentication persistence
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for persistence

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_0O3723dommPFPdlUSmrbAelSMtI0wgI",
  authDomain: "chat-app-e89c5.firebaseapp.com",
  projectId: "chat-app-e89c5",
  storageBucket: "chat-app-e89c5.appspot.com",
  messagingSenderId: "600186927137",
  appId: "1:600186927137:web:uniqueappid"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Firebase Storage
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Set persistence
});

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            auth={auth} // Pass the auth object to the Chat component
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

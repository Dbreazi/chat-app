import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { userID, name, backgroundColor } = route.params;

  const [messages, setMessages] = useState([]);

  // Cache messages locally
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("chat_messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Error caching messages:", error.message);
    }
  };

  // Load cached messages when offline
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("chat_messages") || "[]";
      setMessages(JSON.parse(cachedMessages));
    } catch (error) {
      console.error("Error loading cached messages:", error.message);
    }
  };

  // Fetch messages from Firestore or AsyncStorage based on connection
  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" });

    let unsubscribe;
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }));
        setMessages(newMessages);
        cacheMessages(newMessages); // Cache messages
      });
    } else {
      loadCachedMessages(); // Load cached messages when offline
      Alert.alert("Connection lost", "You're now offline. Viewing cached messages.");
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]);

  // Send a new message to Firestore
  const onSend = (newMessages = []) => {
    const messageToSend = {
      ...newMessages[0],
      user: { _id: userID, name },
    };
    addDoc(collection(db, "messages"), messageToSend).catch((error) =>
      console.error("Error adding message:", error)
    );
  };

  // Customize message bubbles
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" },
      }}
    />
  );

  // Hide InputToolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || "#FFFFFF" },
      ]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  // Destructure parameters passed from Start screen
  const { userID, name, backgroundColor } = route.params;

  // Messages state
  const [messages, setMessages] = useState([]);

  // Fetch messages in real-time
  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" }); // Set navigation bar title
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [db, name, navigation]);

  // Send a new message
  const onSend = (newMessages = []) => {
    const messageToSend = {
      ...newMessages[0],
      user: { _id: userID, name }, // Attach user ID and name
    };
    addDoc(collection(db, "messages"), messageToSend)
      .then(() => console.log("Message sent successfully"))
      .catch((error) => console.error("Error adding message: ", error));
  };

  // Customize message bubble colors
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" }, // Sender's bubble
        left: { backgroundColor: "#FFF" }, // Receiver's bubble
      }}
    />
  );

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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

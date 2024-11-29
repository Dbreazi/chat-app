import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

/* 
 * Chat Component
 * Displays the user's name in the navigation bar and sets the background
 * color of the screen based on the selection made in the Start screen.
 */
const Chat = ({ route, navigation }) => {
  // Destructure parameters passed from Start screen
  const { name, backgroundColor } = route.params;

  // Messages state
  const [messages, setMessages] = useState([]);

  /* 
   * useEffect Hook
   * Initializes a default message when the component mounts
   */
  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" }); // Fallback title if name is empty

    // Set default messages
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, [name, navigation]);

  /* 
   * Function to handle sending messages
   */
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  /* 
   * Function to customize message bubble colors
   */
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // Sender's bubble
          },
          left: {
            backgroundColor: "#FFF", // Receiver's bubble
          },
        }}
      />
    );
  };

  /* 
   * Render
   * Display the Gifted Chat interface with the current messages and onSend handler.
   */
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || "#FFFFFF" }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble} // Pass custom bubble renderer
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // The current user's ID
        }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

/* 
 * Styles
 * Define the layout and styling for the Chat screen elements.
 * - container: Sets up the background color and full-screen layout.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
  },
});

export default Chat;

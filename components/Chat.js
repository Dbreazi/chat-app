import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

/* 
 * Chat Component
 * Displays the user's name in the navigation bar and sets the background
 * color of the screen based on the selection made in the Start screen.
 */
const Chat = ({ route, navigation }) => {
  // Destructure parameters passed from Start screen
  const { name, backgroundColor } = route.params;

  /* 
   * useEffect Hook
   * Updates the navigation bar title to display the user's name.
   * Dependencies: [name, navigation]
   */
  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" }); // Fallback title if name is empty
  }, [name, navigation]);

  /* 
   * Render
   * The container View sets the background color dynamically.
   * Placeholder text indicates where future chat functionality will go.
   */
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || "#FFFFFF" }, // Fallback to white if no color is provided
      ]}
    >
      <Text style={styles.placeholderText}>Chat functionality coming soon!</Text>
    </View>
  );
};

/* 
 * Styles
 * Define the layout and styling for the Chat screen elements.
 * - container: Centers all content on the screen.
 * - placeholderText: Styles the placeholder text for visual clarity.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  placeholderText: {
    fontSize: 18, // Sets the font size for the placeholder
    color: "#757083", // Matches the neutral color scheme
  },
});

export default Chat;

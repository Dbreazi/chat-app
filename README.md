# Achievement 5 Project: React Native Mobile Chat App

## Objective

To develop a mobile chat application using React Native, enabling users to engage in real-time conversations, share images, and exchange location data.

## Context

In today's mobile-centric world, efficient communication is paramount. This project leverages React Native to create a robust, cross-platform chat app that caters to modern user needs.

## Key Features

- **User-Friendly Interface**: Intuitive design for seamless navigation and interaction.
- **Real-Time Chat**: Instant message delivery and updates.
- **Image Sharing**: Share images from the device gallery or directly from the camera.
- **Location Sharing**: Conveniently share real-time location information with other users.
- **Offline Capabilities**: Access cached messages when offline.
- **Accessibility**: Designed to be accessible to users with visual impairments.

## Technologies Used

- **React Native**: Core framework for building native mobile apps.
- **Expo**: Simplified development and deployment process.
- **Google Firestore**: Cloud-based NoSQL database for real-time data storage.
- **Firebase Storage**: Secure storage for user-uploaded images.
- **Firebase Authentication**: Secure user authentication and authorization.
- **Gifted Chat**: Pre-built chat UI component library for rapid development.
- **AsyncStorage**: Local storage for caching messages offline.
- **React Native Maps**: For displaying shared location data.
- **ImagePicker**: To upload and share images.

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Project Structure

- **Components**: Reusable UI components for the chat interface, message bubbles, input fields, etc.
- **Screens**: Individual screens for the app's various views (start screen, chat screen, etc.).
- **Utils**: Helper functions for common tasks like data formatting and API calls.
- **Assets**: Images, icons, and other static assets used in the app.

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

`git clone https://github.com/your-username/chat-app.git`

`cd chat-app`

### 2. Use Node.js Version 18

Ensure you have Node.js v18 installed. If you use nvm, switch to Node 18 with:

`nvm use 18`

If you don't have nvm, install Node.js v18 from [Node.js website](https://nodejs.org).

### 3. Install Dependencies

Install necessary dependencies by running:

`npm install`

### 4. Install Expo CLI

If you don't already have the Expo CLI globally, install it using:

`npm install -g expo-cli`

### 5. Configure Firebase

1. Go to the Firebase console.
2. Create a new Firebase project.
3. Enable Firestore and Firebase Storage:
   - In Firestore and Storage, set the rules as follows during development:

'{ "rules": { ".read": "auth != null", ".write": "auth != null" } }'


4. Add a web app to your project and copy the config.
5. Add the Firebase config to your project in the `firebaseConfig` object in `App.js`:

'const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_STORAGE_BUCKET", messagingSenderId: "YOUR_MESSAGING_SENDER_ID", appId: "YOUR_APP_ID" };'


### 6. Run the App Locally

Start the development server using:

`npm run start`

After starting:

- Open the app on your physical device using the Expo Go app.
- Or run it on an Emulator (Android Studio).

## Contribute

We welcome contributions to improve this project. Please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Push your changes to your forked repository.
- Submit a pull request to the main repository.

import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, storage, onSend, userID }) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const imageName = uri.split("/")[uri.split("/").length - 1];
    const timeStamp = (new Date()).getTime();
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);

      const response = await fetch(imageURI);
      const blob = await response.blob();

      uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref);
        onSend({ image: imageURL });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image. Please try again.");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;



//Below is code with working camera function, not linked to firebase storage

// import React from "react";
// import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
// import { useActionSheet } from "@expo/react-native-action-sheet";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";

// /**
//  * CustomActions Component
//  * Provides options for users to pick an image, take a photo, or send their location.
//  */
// const CustomActions = ({ wrapperStyle, iconTextStyle, onSend = () => {} }) => {
//   const actionSheet = useActionSheet();

//   /**
//    * Pick an image from the device's media library.
//    */
//   const pickImage = async () => {
//     try {
//       let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (permissions.granted) {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: [ImagePicker.MediaType.Images],
//         });
//         if (!result.canceled) {
//           onSend({ image: result.assets[0].uri }); // Send image URI
//         }
//       } else {
//         Alert.alert("Permission to access media library is required!");
//       }
//     } catch (error) {
//       console.error("Error picking image:", error.message);
//     }
//   };

//   /**
//    * Take a photo using the device's camera.
//    */
//   const takePhoto = async () => {
//     try {
//       let permissions = await ImagePicker.requestCameraPermissionsAsync();
//       if (permissions.granted) {
//         let result = await ImagePicker.launchCameraAsync();
//         if (!result.canceled) {
//           onSend({ image: result.assets[0].uri }); // Send photo URI
//         }
//       } else {
//         Alert.alert("Permission to access the camera is required!");
//       }
//     } catch (error) {
//       console.error("Error taking photo:", error.message);
//     }
//   };

//   /**
//    * Fetch and send the user's current location.
//    */
//   const getLocation = async () => {
//     try {
//       let permissions = await Location.requestForegroundPermissionsAsync();
//       if (permissions.granted) {
//         const location = await Location.getCurrentPositionAsync({});
//         if (location) {
//           onSend({
//             location: {
//               longitude: location.coords.longitude,
//               latitude: location.coords.latitude,
//             },
//           });
//         } else {
//           Alert.alert("Unable to fetch location. Please try again.");
//         }
//       } else {
//         Alert.alert("Location permissions are required!");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error.message);
//     }
//   };

//   /**
//    * Show action sheet with options for additional functionality.
//    */
//   const onActionPress = () => {
//     const options = [
//       "Choose From Library",
//       "Take Picture",
//       "Send Location",
//       "Cancel",
//     ];
//     const cancelButtonIndex = options.length - 1;

//     actionSheet.showActionSheetWithOptions(
//       {
//         options,
//         cancelButtonIndex,
//       },
//       async (buttonIndex) => {
//         switch (buttonIndex) {
//           case 0:
//             pickImage();
//             break;
//           case 1:
//             takePhoto();
//             break;
//           case 2:
//             getLocation();
//             break;
//           default:
//             break;
//         }
//       }
//     );
//   };

//   return (
//     <TouchableOpacity style={[styles.container, wrapperStyle]} onPress={onActionPress}>
//       <View style={[styles.wrapper]}>
//         <Text style={[styles.iconText, iconTextStyle]}>+</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: 26,
//     height: 26,
//     marginLeft: 10,
//     marginBottom: 10,
//   },
//   wrapper: {
//     borderRadius: 13,
//     borderColor: "#b2b2b2",
//     borderWidth: 2,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconText: {
//     color: "#b2b2b2",
//     fontWeight: "bold",
//     fontSize: 10,
//     backgroundColor: "transparent",
//     textAlign: "center",
//   },
// });

// export default CustomActions;
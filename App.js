import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';



// https://api.github.com/users/

const App = () => {

  const axios = require('axios').default;

  const [user, setUser] = useState('');
  const [imageUri, setImageUri] = useState('');

  const getUser = async () => {

    try {

      if (!user) {
        Snackbar.show({
          text: 'Enter the user name',
          duration: Snackbar.LENGTH_SHORT,
        });

        return;
      }

      const { data } = await axios.get(`https://api.github.com/users/${user}`)
      const image = data.avatar_url;
      setImageUri(image);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#03203C" />
      <View style={styles.Container}
        keyboardDismissMode="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        {!imageUri ? null :
          <Image
            style={{
              marginBottom: 20,
              borderRadius: 8,
            }}
          source={{
            uri: imageUri,
            width: 200,
            height: 200,
          }}
        />
        }
        <TextInput
          style={styles.input}
          placeholder="Enter the user name"
          textAlign="center"
          onChangeText={value => setUser(value)}
        />
        <TouchableOpacity
          onPress={getUser}
        >
          <Text
            style={styles.button}
          >
            Get
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default App;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#03203C"
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#46B2E0",
    borderRadius: 8
  },
  button: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#46B2E0",
    borderRadius: 6,
    marginTop: 20
  }
})
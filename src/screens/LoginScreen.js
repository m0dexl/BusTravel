import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.replace("Home");
          console.log(authUser.providerData);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const login = async () => {
    try {
      if (email === "" || password === "") {
        Alert.alert("Invalid Details", "Please enter all the details");
      } else {
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // console.log(userCredential, "usercredentials");
            const user = userCredential.user;
            // console.log(user, "userdetails");
          }
        );
      }
    } catch (error) {
      console.log(error);
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      ) {
        Alert.alert("Invalid Details", "Email or Password Wrong! Try again.");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContainer}>
          <Text style={styles.topText1}>Sign In</Text>
          <Text style={styles.topText2}>Sign In to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.emailInputContainer}>
            <Text style={styles.emailInputText}>Email</Text>
            <TextInput
              value={email}
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
              placeholder="enter your email id"
              placeholderTextColor={valid ? "gray" : "red"}
              style={[
                styles.emailInput,
                {
                  fontSize: email ? 18 : 18,
                  borderBottomColor: valid ? "gray" : "red",
                },
              ]}
            />
          </View>
          <View style={styles.pwdInputContainer}>
            <Text style={styles.pwdInputText}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="password"
              maxLength={12}
              placeholderTextColor={valid ? "gray" : "red"}
              style={[
                styles.pwdInput,
                {
                  fontSize: password ? 18 : 18,
                  borderBottomColor: valid ? "gray" : "red",
                },
              ]}
            />
          </View>
        </View>
        <Pressable style={styles.submitContainer} onPress={login}>
          <Text style={styles.submitText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Register");
            setValid(true);
          }}
          style={styles.bottomContainer}
        >
          <Text style={styles.bottomText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 10,
    alignItems: "center",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  topText1: {
    color: "#003580",
    fontSize: 17,
    fontWeight: "700",
  },
  topText2: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "500",
  },
  inputContainer: { marginTop: 50 },
  emailInputContainer: {},
  emailInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  emailInput: {
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  pwdInputContainer: { marginTop: 15 },
  pwdInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  pwdInput: {
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  submitContainer: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  bottomContainer: { marginTop: 20 },
  bottomText: { textAlign: "center", color: "gray", fontSize: 17 },
});

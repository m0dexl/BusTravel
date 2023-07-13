import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [gender, setGender] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const register = async () => {
    try {
      if (
        email === "" ||
        name === "" ||
        surname === "" ||
        idNumber === "" ||
        gender === "" ||
        password === "" ||
        checkPw === "" ||
        password !== checkPw
      ) {
        Alert.alert("Invalid Details", "Please enter all the details");
      } else {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredentials) => {
            const user = userCredentials._tokenResponse.email;
            const uid = auth.currentUser.uid;

            setDoc(doc(db, "users", `${uid}`), {
              email: user,
              gender: gender,
            });
            auth.signOut();
            navigation.navigate("Login");
          }
        );
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Invalid Details", "Try another email!");
      }
    }
  };

  const route = useRoute();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContainer}>
          <Text style={styles.topText1}>Register</Text>
          <Text style={styles.topText2}>Create an Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input1n2}>
            <View style={styles.nameInputContainer}>
              <Text style={styles.nameInputText}>Name</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                inputMode="text"
                placeholder="enter your name"
                placeholderTextColor={"gray"}
                style={[
                  styles.nameInput,
                  {
                    fontSize: name ? 18 : 18,
                  },
                ]}
              />
            </View>
            <View style={styles.surnameContainer}>
              <Text style={styles.surnameInputText}>Surname</Text>
              <TextInput
                value={surname}
                onChangeText={(text) => setSurname(text)}
                inputMode="text"
                placeholder="enter your surname"
                placeholderTextColor={"gray"}
                style={[
                  styles.surnameInput,
                  {
                    fontSize: surname ? 18 : 18,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.input3n4Container}>
            <View style={styles.idContainer}>
              <Text style={styles.idInputText}>Id Number</Text>
              <TextInput
                value={idNumber}
                onChangeText={(text) => setIdNumber(text)}
                inputMode="numeric"
                maxLength={11}
                placeholder="id number"
                placeholderTextColor={"gray"}
                style={[
                  styles.idInput,
                  {
                    fontSize: idNumber ? 18 : 18,
                  },
                ]}
              />
            </View>
            <View style={styles.genderContainer}>
              <Text style={styles.genderInputText}>Gender</Text>
              <TextInput
                value={gender}
                onChangeText={(text) => setGender(text)}
                inputMode="text"
                placeholder="male or female"
                placeholderTextColor={"gray"}
                maxLength={6}
                style={[
                  styles.genderInput,
                  {
                    fontSize: gender ? 18 : 18,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.emailInputText}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputMode="email"
              placeholder="enter your email"
              placeholderTextColor={"gray"}
              style={[
                styles.emailInput,
                {
                  fontSize: email ? 18 : 18,
                },
              ]}
            />
          </View>
          <View style={styles.pwdContainer}>
            <Text style={styles.pwdInputText}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="password"
              maxLength={12}
              placeholderTextColor={"gray"}
              style={[
                styles.pwdInput,
                {
                  fontSize: password ? 18 : 18,
                },
              ]}
            />
          </View>
          <View style={styles.pwdCheckContainer}>
            <Text style={styles.pwdCheckInputText}>Password Again</Text>
            <TextInput
              value={checkPw}
              onChangeText={(text) => setCheckPw(text)}
              secureTextEntry={true}
              placeholder="password again"
              maxLength={12}
              placeholderTextColor={"gray"}
              style={[
                styles.pwdCheckInput,
                {
                  fontSize: checkPw ? 18 : 18,
                },
              ]}
            />
          </View>
        </View>
        <Pressable style={styles.submitContainer} onPress={register}>
          <Text style={styles.submitText}>Sign Up</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.bottomContainer}
        >
          <Text style={styles.bottomText}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    marginTop: 25,
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
  inputContainer: { marginTop: 25 },
  input1n2: { flexDirection: "row" },
  nameInputContainer: {},
  nameInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  nameInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 140,
  },
  surnameContainer: { marginLeft: 20 },
  surnameInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  surnameInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 140,
  },
  input3n4Container: { marginTop: 5, flexDirection: "row" },
  idContainer: {},
  idInputText: { fontSize: 18, fontWeight: "600", color: "gray" },
  idInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 140,
  },
  genderContainer: { marginLeft: 20 },
  genderInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  genderInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 140,
  },
  emailContainer: { marginTop: 5 },
  emailInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  emailInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 300,
  },
  pwdContainer: { marginTop: 5 },
  pwdInputText: { fontSize: 18, fontWeight: "600", color: "gray" },
  pwdInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 300,
  },
  pwdCheckContainer: { marginTop: 5 },
  pwdCheckInputText: { fontSize: 18, fontWeight: "600", color: "gray" },
  pwdCheckInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 5,
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

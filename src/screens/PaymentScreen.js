import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import TravelDatas from "../datas/TravelDatas";
import InputsContext from "../app/context/InputsContext";

const PaymentScreen = () => {
  const {
    departureInputName,
    destinationInputName,
    selectedTravelId,
    setAfterSelectSeats,
    selectedTicketNumber,
    setSelectedTicketNumber,
  } = useContext(InputsContext);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpireDate, setCardExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.ticketInfoText}>
          {` ${TravelDatas[selectedTravelId - 1].departureName} to 
          ${TravelDatas[selectedTravelId - 1].destinationName}`}
        </Text>
        <Text style={styles.priceText}>
          {`${selectedTicketNumber} ticket/s -> Price: ${
            selectedTicketNumber *
            TravelDatas[selectedTravelId - 1].pricePerTicket
          }`}
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <View>
          <Text style={styles.cardNoText}>Card Number</Text>
          <TextInput
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
            inputMode="numeric"
            maxLength={16}
            placeholder="enter your card number"
            placeholderTextColor={"black"}
            style={[styles.cardNoInput, { fontSize: cardNumber ? 18 : 18 }]}
          />
        </View>
        <View style={styles.cvvContainer}>
          <Text style={styles.cvvText}>CVC/CVV</Text>
          <TextInput
            value={cvv}
            onChangeText={(text) => setCvv(text)}
            secureTextEntry={true}
            inputMode="numeric"
            maxLength={3}
            placeholder="cvc/cvv"
            placeholderTextColor={"black"}
            style={[
              styles.cvvInput,
              {
                fontSize: cvv ? 18 : 18,
              },
            ]}
          />
        </View>
        <View style={styles.expireDateContainer}>
          <Text style={styles.expireDateText}>Expire Date</Text>
          <TextInput
            value={cardExpireDate}
            inputMode="text"
            onChangeText={(text) => setCardExpireDate(text)}
            placeholder="expire date (MM/YY)"
            placeholderTextColor={"black"}
            style={[
              styles.expireDateInput,
              {
                fontSize: cardExpireDate ? 18 : 18,
              },
            ]}
          />
        </View>
        <View style={styles.cardHolderNameContainer}>
          <Text style={styles.cardHolderNameText}>Card Holder Name</Text>
          <TextInput
            value={cardHolderName}
            inputMode="text"
            onChangeText={(text) => setCardHolderName(text)}
            placeholder="card holder name"
            placeholderTextColor={"black"}
            style={[
              styles.cardHolderNameInput,
              {
                fontSize: cardHolderName ? 18 : 18,
              },
            ]}
          />
        </View>
      </View>
      <Pressable
        style={styles.paymentBtn}
        onPressIn={() => {
          if (cardNumber || (cardExpireDate && cardHolderName && cvv)) {
            Alert.alert("Successfull", "Your payment has been successfull");

            navigation.navigate("Details");
          } else {
            Alert.alert("Invalid Details", "Please enter all the details");
          }
        }}
      >
        <Text style={styles.paymentBtnText}>Pay</Text>
      </Pressable>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  ticketInfoText: { color: "#003580", fontSize: 17, fontWeight: "700" },
  priceText: { marginTop: 15, fontSize: 18, fontWeight: "500" },
  paymentContainer: { marginTop: 50 },
  cardNoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  cardNoInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  cvvContainer: { marginTop: 15 },
  cvvText: { fontSize: 18, fontWeight: "600", color: "gray" },
  cvvInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  expireDateContainer: { marginTop: 15 },
  expireDateText: { fontSize: 18, fontWeight: "600", color: "gray" },
  expireDateInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  cardHolderNameContainer: { marginTop: 15 },
  cardHolderNameText: { fontSize: 18, fontWeight: "600", color: "gray" },
  cardHolderNameInput: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  paymentBtn: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  paymentBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});

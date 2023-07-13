import React, { useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TravelDatas from "../datas/TravelDatas";
import InputsContext from "../app/context/InputsContext";

const windowWidth = Dimensions.get("window").width;

const DetailsScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: " Payment Succesfull - Ticket Details",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 120,
      },
      headerBackVisible: false,
    });
  });

  const {
    selectedDepartureId,
    setSelectedDepartureId,
    selectedDestinationId,
    setSelectedDestinationId,
    departureInputName,
    setDepartureInputName,
    destinationInputName,
    setDestinationInputName,
    selectedDate,
    setSelectedDate,
    selectedTravelId,
    setSelectedTravelId,
    afterSelectSeats,
    setAfterSelectSeats,
    selectedTicketNumber,
    setSelectedTicketNumber,
  } = useContext(InputsContext);

  const selectedSeats = afterSelectSeats.filter(
    (selectedSeat) => selectedSeat.selected === true
  );

  let seatsArr = [...selectedSeats];

  let seats = "";

  seatsArr.forEach((item) => {
    seats += `${item.id}, `;
  });
  console.log(selectedSeats);
  console.log(seats);

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.detailContainer}>
          <View>
            <Image
              style={{ width: 110, height: 70 }}
              source={{ uri: TravelDatas[selectedTravelId - 1].icon }}
            />
          </View>
          <View style={styles.detailsTextContainer}>
            <View style={styles.detailtTitleTextContainer}>
              <Text style={styles.detailTitleText}>
                {TravelDatas[selectedTravelId - 1].departureName} ➔
                {TravelDatas[selectedTravelId - 1].destinationName}
              </Text>
            </View>
            <View style={styles.detailInnerContainer}>
              <Text>
                {` ${TravelDatas[selectedTravelId - 1].timeOfDeparture} - ${
                  TravelDatas[selectedTravelId - 1].timeOfDestination
                }         ${TravelDatas[selectedTravelId - 1].dateOfDeparture}`}
              </Text>
              <Text>
                {`₺${
                  TravelDatas[selectedTravelId - 1].pricePerTicket *
                  selectedSeats.length
                } for ${selectedSeats.length} seat/s`}
              </Text>
              <Text>Seat Numbers: {seats} </Text>
            </View>
          </View>
        </View>
        <Button
          title="Go Homepage"
          onPress={() => {
            setAfterSelectSeats("");
            navigation.navigate("Home");
          }}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderStyle: "dotted",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsTextContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    width: windowWidth * 0.55,
  },
  detailtTitleTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  detailTitleText: { fontSize: 15, fontWeight: "bold" },
  detailInnerContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: { marginVertical: 50 },
});

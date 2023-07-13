import React, { useContext, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
} from "react-native";
import InputsContext from "../app/context/InputsContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TravelDatas from "../datas/TravelDatas";

const SeatsScreen = () => {
  const {
    departureInputName,
    destinationInputName,
    selectedTravelId,
    setAfterSelectSeats,
    selectedTicketNumber,
    setSelectedTicketNumber,
  } = useContext(InputsContext);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${departureInputName} to ${destinationInputName} ~ Seats `,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "red",
        height: 120,
      },
    });
  });

  const [row1, setRow1] = useState(
    TravelDatas[selectedTravelId - 1].seats.slice(0, 20)
  );
  const [row2, setRow2] = useState(
    TravelDatas[selectedTravelId - 1].seats.slice(20, 40)
  );

  const [countTicket, setCountTicket] = useState(0);

  const [gender, setGender] = useState();

  const onSelectRow1 = (index) => {
    let tempRow = [];
    tempRow = row1;
    tempRow.map((item, indx) => {
      if (index === indx) {
        if (item.selected === true) {
          item.selected = false;
          item.available = 1;
          setCountTicket(countTicket - 1);
        } else {
          setCountTicket(countTicket + 1);
          console.log(countTicket);
          if (countTicket >= 5) {
            setCountTicket(5);
          }

          if (countTicket < 5) {
            item.selected = true;
            item.available = 0;
          } else {
            Alert.alert("asdas", "max5seat");
          }
        }
      }
    });

    let tempSeats = [];
    tempRow.map((item) => {
      tempSeats.push(item);
    });

    setRow1(tempSeats);
  };

  const onSelectRow2 = (index) => {
    let tempRow = [];
    tempRow = row2;
    tempRow.map((item, indx) => {
      if (index === indx) {
        if (item.selected === true) {
          item.selected = false;
          item.available = 1;
          setCountTicket(countTicket - 1);
        } else {
          setCountTicket(countTicket + 1);
          console.log(countTicket);
          if (countTicket >= 5) {
            setCountTicket(5);
          }

          if (countTicket < 5) {
            item.selected = true;
            item.available = 0;
          } else {
            Alert.alert("asdas", "max5seat");
          }
        }
      }
    });

    let tempSeats = [];
    tempRow.map((item) => {
      tempSeats.push(item);
    });

    setRow2(tempSeats);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.busContainer}>
        <MaterialCommunityIcons
          name="steering"
          size={36}
          color="black"
          style={{ margin: 20 }}
        />
        <View style={styles.row1Container}>
          <View>
            <FlatList
              data={row1}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={styles.seatContainer}
                    onPressIn={() => {
                      if (item.selected === false && item.available === 0) {
                        alert("Already booked");
                      } else {
                        onSelectRow1(index);
                      }
                    }}
                    onPress={() => console.log(countTicket)}
                  >
                    {item.available === 0 && item.selected === true ? (
                      <Image
                        source={require("../../assets/seat1.png")}
                        style={{ width: 24, height: 24, tintColor: "green" }}
                      />
                    ) : item.available === 1 && item.selected === false ? (
                      <Image
                        source={require("../../assets/seat2.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    ) : item.available === 0 && item.selected === false ? (
                      <View
                        style={
                          item.gender === "male"
                            ? { backgroundColor: "#2196F3" }
                            : { backgroundColor: "pink" }
                        }
                      >
                        <Image
                          source={require("../../assets/seat1.png")}
                          style={{
                            width: 24,
                            height: 24,
                            tintColor: "#BeBEBE",
                          }}
                        />
                      </View>
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </View>
          <View>
            <FlatList
              data={row2}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={styles.seatContainer}
                    onPress={() => {
                      if (item.selected === false && item.available === 0) {
                        alert("Already booked");
                      } else {
                        onSelectRow2(index);
                      }
                    }}
                  >
                    {item.available === 0 && item.selected === true ? (
                      <Image
                        source={require("../../assets/seat1.png")}
                        style={{ width: 24, height: 24, tintColor: "green" }}
                      />
                    ) : item.available === 1 && item.selected === false ? (
                      <Image
                        source={require("../../assets/seat2.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    ) : item.available === 0 && item.selected === false ? (
                      <View
                        style={
                          item.gender === "male"
                            ? { backgroundColor: "#2196F3" }
                            : { backgroundColor: "pink" }
                        }
                      >
                        <Image
                          source={require("../../assets/seat1.png")}
                          style={{
                            width: 24,
                            height: 24,
                            tintColor: "#BeBEBE",
                          }}
                        />
                      </View>
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Text>
          {`${countTicket} Ticket/s --- Price: ${
            countTicket * TravelDatas[selectedTravelId - 1].pricePerTicket
          } `}
        </Text>
        <Button
          title="Buy"
          onPress={() => {
            setAfterSelectSeats(row1.concat(row2));
            setSelectedTicketNumber(countTicket);
            navigation.navigate("Payment");
          }}
        />
      </View>
    </View>
  );
};

export default SeatsScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  busContainer: {
    width: "65%",
    height: "70%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
  },
  row1Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seatContainer: { margin: 7 },
});

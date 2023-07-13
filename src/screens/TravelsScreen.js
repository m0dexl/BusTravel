import React, { useContext, useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputsContext from "../app/context/InputsContext";
import { useNavigation } from "@react-navigation/native";
import TravelDatas from "../datas/TravelDatas";

const TravelsScreen = () => {
  const navigation = useNavigation();
  const {
    selectedDepartureId,
    selectedDestinationId,
    departureInputName,
    destinationInputName,
    selectedDate,
    setSelectedTravelId,
  } = useContext(InputsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: ` ${departureInputName} to ${destinationInputName} `,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 120,
      },
    });
  });

  const onSelectTravel = () => {
    navigation.navigate("Seats");
  };

  return (
    <View>
      <View>
        <FlatList
          data={TravelDatas}
          renderItem={({ item }) => {
            if (
              item.departure.includes(selectedDepartureId) &&
              item.destination.includes(selectedDestinationId) &&
              item.dateOfDeparture.includes(selectedDate)
            ) {
              let emptySeats = 0;
              return (
                <Pressable
                  style={styles.travelInfoContainer}
                  onPressIn={() => {
                    setSelectedTravelId(item.id);
                  }}
                  onPress={onSelectTravel}
                >
                  <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: item.icon }} />
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={styles.titleInfoDpNameDsName}>
                      <Text style={styles.titleInfoDpNameDsNameText}>
                        {item.departureName} ➔ {item.destinationName}
                      </Text>
                    </View>
                    <View style={styles.timeNPriceContainer}>
                      <Text>
                        {item.timeOfDeparture} - {item.timeOfDestination}
                      </Text>
                      <Text>₺{item.pricePerTicket}</Text>
                      {item.seats.forEach(function (elem) {
                        if (elem.available === 1) {
                          emptySeats++;
                        }
                      })}
                    </View>
                    <View style={styles.emptySeatsInfoContainer}>
                      <Text
                        style={styles.emptySeatsInfoText}
                      >{`${emptySeats}/${item.seats.length} Empty Seats`}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default TravelsScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  travelInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  imgContainer: {},
  img: { width: 110, height: 70 },
  rightContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    width: windowWidth * 0.55,
  },
  titleInfoDpNameDsName: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleInfoDpNameDsNameText: { fontSize: 15, fontWeight: "bold" },
  timeNPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  emptySeatsInfoContainer: {
    alignItems: "center",
  },
  emptySeatsInfoText: { fontSize: 14 },
});

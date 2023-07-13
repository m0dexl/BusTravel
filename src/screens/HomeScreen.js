import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import LocationsData from "../datas/LocationDatas";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import InputsContext from "../app/context/InputsContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const {
    setSelectedDepartureId,
    setSelectedDestinationId,
    setDepartureInputName,
    setDestinationInputName,
    setSelectedDate,
  } = useContext(InputsContext);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "BusTravel ~ Best way to travel!",
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

  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const onSearch = () => {
    if (
      selectedDeparture === "" ||
      selectedDestination === "" ||
      startedDate === ""
    ) {
      Alert.alert("Invalid Details", "Please enter all the details");
    } else if (selectedDeparture === selectedDestination) {
      Alert.alert(
        "Invalid Details",
        "Departure and destination can not be the same!"
      );
    } else {
      setDepartureInputName(LocationsData[selectedDeparture - 1].value);
      setDestinationInputName(LocationsData[selectedDestination - 1].value);
      setSelectedDate(startedDate);
      setSelectedDepartureId(selectedDeparture);
      setSelectedDestinationId(selectedDestination);

      navigation.navigate("Travels");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.stListContainer}>
            <SelectList
              data={LocationsData}
              setSelected={setSelectedDeparture}
              placeholder="From Where"
              dropdownStyles={{ backgroundColor: "gray" }}
              dropdownTextStyles={{ color: "white", fontWeight: "bold" }}
            />
          </View>

          <View style={styles.ndListContainer}>
            <View style={styles.arrowdownContainer}>
              <AntDesign name="arrowdown" size={30} color="black" />
            </View>
            <SelectList
              data={LocationsData}
              setSelected={setSelectedDestination}
              placeholder="To Where"
              dropdownStyles={{ backgroundColor: "gray" }}
              dropdownTextStyles={{ color: "white", fontWeight: "bold" }}
            />
          </View>
          <View style={styles.datepickerContainer}>
            <View style={styles.datepickerTopTextContainer}>
              <Text style={styles.datePickerTopText}>Select Date</Text>
            </View>
            <TouchableOpacity
              style={styles.datepickerSelectedDate}
              onPress={handleOnPressStartDate}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalInnerContanier}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChange={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122,146,165,0.1)",
                  }}
                />
                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={styles.datepickerModalSubmitBtn}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {},
  innerContainer: {
    marginVertical: windowHeight * 0.1,
    paddingHorizontal: windowWidth * 0.12,
  },
  stListContainer: {},
  ndListContainer: {},
  arrowdownContainer: { justifyContent: "center", alignItems: "center" },
  datepickerContainer: {
    width: windowWidth * 0.762,
    marginTop: 22,
  },
  datepickerTopTextContainer: {},
  datePickerTopText: { fontSize: 18 },
  datepickerSelectedDate: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
    height: 42,
    paddingHorizontal: windowWidth * 0.05,
    fontSize: 18,
    justifyContent: "center",
  },
  searchBtn: {
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  searchBtnText: { fontSize: 20, color: "white" },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalInnerContanier: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  datepickerModalSubmitBtn: { color: "white" },
});

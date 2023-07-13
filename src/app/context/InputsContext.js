import { createContext, useState } from "react";

const InputsContext = createContext();

export function InputsProvider({ children }) {
  const [selectedDepartureId, setSelectedDepartureId] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [departureInputName, setDepartureInputName] = useState("");
  const [destinationInputName, setDestinationInputName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTravelId, setSelectedTravelId] = useState("");
  const [afterSelectSeats, setAfterSelectSeats] = useState();
  const [selectedTicketNumber, setSelectedTicketNumber] = useState(0);
  const values = {
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
  };
  return (
    <InputsContext.Provider value={values}>{children}</InputsContext.Provider>
  );
}

export default InputsContext;

import { useState } from "react";
import DestinationList from "./components/DestinationList";
import AddDestinationForm from "./components/AddDestinationForm";

function App() {
  const [destinations, setDestinations] = useState([
    { id: 1, place: "Paris", country: "France", description: "City of Lights" },
    { id: 2, place: "Delhi", country: "India", description: "Capital of India" }
  ]);

  const addDestination = (destination) => {
    const newDestination = { id: Date.now(), ...destination };
    setDestinations([...destinations, newDestination]);
  };

  const deleteDestination = (id) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Travel Destinations</h1>
      <AddDestinationForm addDestination={addDestination} />
      <DestinationList destinations={destinations} deleteDestination={deleteDestination} />
    </div>
  );
}

export default App;

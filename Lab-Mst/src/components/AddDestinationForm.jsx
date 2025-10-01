import { useState } from "react";

function AddDestinationForm({ addDestination }) {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDestination({ place, country, description });
    setPlace("");
    setCountry("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 space-y-2">
      <input
        type="text"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Destination
      </button>
    </form>
  );
}

export default AddDestinationForm;

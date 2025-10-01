function DestinationItem({ destination, deleteDestination }) {
  return (
    <div className="border p-4 my-2 flex justify-between items-center">
      <div>
        <h2 className="font-bold">{destination.place}, {destination.country}</h2>
        <p>{destination.description}</p>
      </div>
      <button 
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => deleteDestination(destination.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default DestinationItem;

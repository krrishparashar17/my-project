import DestinationItem from "./DestinationItem";

function DestinationList({ destinations, deleteDestination }) {
  return (
    <div>
      {destinations.map((d) => (
        <DestinationItem key={d.id} destination={d} deleteDestination={deleteDestination} />
      ))}
    </div>
  );
}

export default DestinationList;

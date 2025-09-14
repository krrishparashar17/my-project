function PersonCard({ title, details }) {
  return (
    <div className="person-card">
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  );
}

export default PersonCard;
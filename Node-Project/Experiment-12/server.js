const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { getSeats, lockSeat, confirmSeat } = require("./seatManager");

app.use(cors());
app.use(express.json());

app.get("/seats", (req, res) => {
  res.status(200).json(getSeats());
});

app.post("/lock/:id", (req, res) => {
  const id = req.params.id;
  const result = lockSeat(id);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

app.post("/confirm/:id", (req, res) => {
  const id = req.params.id;
  const result = confirmSeat(id);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
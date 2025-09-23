const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" },
];

const VALID_SUITS = new Set(["Hearts", "Spades", "Diamonds", "Clubs"]);
const nextId = () =>
  cards.length ? Math.max(...cards.map((c) => c.id)) + 1 : 1;

app.get("/", (_req, res) => res.json({ status: "ok" }));

app.get("/cards", (_req, res) => {
  res.status(200).json(cards);
});

app.get("/cards/:id", (req, res) => {
  const id = Number(req.params.id);
  const card = cards.find((c) => c.id === id);
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.status(200).json(card);
});

app.post("/cards", (req, res) => {
  const { suit, value } = req.body ?? {};
  if (!suit || !VALID_SUITS.has(String(suit)))
    return res.status(400).json({
      error: "Invalid or missing 'suit'. Use Hearts|Spades|Diamonds|Clubs.",
    });
  if (!value || typeof value !== "string" || !value.trim())
    return res.status(400).json({ error: "Invalid or missing 'value'." });

  const card = { id: nextId(), suit: String(suit), value: value.trim() };
  cards.push(card);
  res.status(201).json(card);
});

app.delete("/cards/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = cards.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Card not found" });
  const [removed] = cards.splice(idx, 1);
  res.status(200).json({ message: `Card with ID ${id} removed`, card: removed });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cards API running on http://localhost:${PORT}`);
});

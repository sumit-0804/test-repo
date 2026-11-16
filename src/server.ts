import express from "express";
import { pool } from "./db.js";
import { orders } from "./routes/orders.js";
import { users } from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(orders);
app.use(users);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/products", async (_req, res) => {
  const { rows } = await pool.query("SELECT id, name, price_cents AS \"priceCents\" FROM products ORDER BY id");
  res.json(rows);
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`listening on ${port}`));

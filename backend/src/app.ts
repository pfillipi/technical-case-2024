import express from "express";
import { db } from "./database";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

app.get("/users", (_req, res) => {
  const users = db.getUsers();
  res.status(200).json(users);
});

app.get("/activities", (_req, res) => {
  const activities = db.getActivities();
  res.status(200).json(activities);
});

app.get("/userActivities", (_req, res) => {
  const userActivities = db.getUserActivities();
  res.status(200).json(userActivities);
});

app.get("/api/dashboard", (req, res) => {
  const data = {
    users: db.getUsers,
    activities: db.getActivities,
    userActivities: db.getUserActivities,
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

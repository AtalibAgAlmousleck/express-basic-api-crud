import express, { json } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// list of users
let users = [
  { id: 1, name: "Nelson", username: "nelson", email: "nelson@gmail.com" },
  {
    id: 2,
    name: "Almousleck",
    username: "almousleck",
    email: "almousleck@gmail.com",
  },
  { id: 3, name: "ousmane", username: "ousmane", email: "ousmane@gmail.com" },
  {
    id: 4,
    name: "Developer",
    username: "developer",
    email: "developer@gmail.com",
  },
];

// get all users
app.get("/api/v1/users", (req, res) => {
  res.json(users);
});

//! find user with id
app.get("/api/v1/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id == userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User with the given id not found" });
  }
});

//! post method
app.post("/api/v1/users", (req, res) => {
  const { name, username, email } = req.body;

  if (!name || !username || !email) {
    res.status(400).json({
      error: "Name, username, and email are required",
    });
    return;
  }

  //todo add new user
  const newUser = {
    id: users.length + 1,
    name,
    username,
    email,
  };

  users.push(newUser);
  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

//todo update user with id
app.put("/api/v1/users/:id", function (req, res) {
  const userId = parseInt(req.params.id);
  const { name, username, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: name || users[userIndex].name,
      username: username || users[userIndex].username,
      email: email || users[userIndex].email,
    };
    res.json({
      message: "User details updated success",
      user: users[userIndex],
    });
  } else {
    res.status(404).json({ error: "User with the given details not found" });
  }
});

//todo delete user by id method
app.delete("/api/v1/users/:id", function (req, res) {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const deleteUser = users.splice(userIndex, 1);
    res.json({
      message: "User deleted successfully",
      user: deleteUser[0],
    });
  } else {
    res.status(404).json({
      error: "User with the given id: not found",
    });
  }
});

// Page Not Found error handler
app.use(function (req, res) {
  res.status(404).json({
    error: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

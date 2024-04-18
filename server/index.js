const express = require("express");
const cors = require("cors");
const router = require("./routers");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app,
  server,
};

const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// const Role = db.role;

app.use("/uploads", express.static("uploads"));

db.mongoose
  .connect(
    `mongodb+srv://tami00:MEUxClWqUNbLz359@cluster0.gmvao.mongodb.net/shop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
// require(".app/routes/favourite.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.use("/api/admin", require("./app/routes/admin.routes"));
app.use("/api/review", require("./app/routes/review.routes"));
app.use("/api", require("./app/routes/cart.routes"));

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

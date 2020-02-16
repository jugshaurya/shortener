const express = require("express");
const morgan = require("morgan");
const app = express();

const { MongoClient } = require("mongodb");
const { shortIt, redirectIt } = require("./services/services");

const client = new MongoClient(
  process.env.MONGODB_URL || "mongodb://localhost:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(express.static(__dirname + "/public"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.post("/api/shortit", shortIt(client));
app.get("/s/:shortName", redirectIt(client));

// error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err.message, status: err.status });
  // res.redirect(`/error.html?msg=${err.message}&status=${status}`);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Listening on Port", PORT);
});

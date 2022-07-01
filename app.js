const express = require("express");
const path = require("path");
const router = require("./routes/TasaDeCambioRouter");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "build")));

app.use("/api/", cors(), router);


app.all("*" , (err,req,res, next) => {
    res.status = 500


    next()
    
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listen on port " + PORT);
});

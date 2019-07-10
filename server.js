const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const router = express.Router();
const cors = require('cors');

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(cors());

app.options('*', cors());

app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});

// Routes
app.use("/", users);
router.get('/', (req,res) => {
    res.send('Ok');
});

const port = process.env.PORT || 5000;
app.get('/', function(req, res){
    res.json("Express is working!");
});
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

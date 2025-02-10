const express = require("express");
const cors = require("cors");

// Database connection
const connectDB = require("./db");
connectDB();

const BalanceSheetRouter = require("./routes/BalanceSheetRoutes");
const AuthenticationRouter = require("./routes/AuthenticationRoutes");
const AdminRouter = require("./routes/AdminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", BalanceSheetRouter);
app.use("/api/auth", AuthenticationRouter)
app.use("/api", AdminRouter);


app.listen(5000, () => {
    console.log("Server is started at port: ", 5000);
})
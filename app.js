const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/user");

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const { sequelize } = require("./models");


app.use(cors({ credentials: true, origin: '*' }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter)

app.listen(port, async () => {
    await sequelize.authenticate();
    console.log("hello connected");
    
})

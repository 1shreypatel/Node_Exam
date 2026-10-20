const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db');

const indexRouter = require('./router/indexRouter');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/employee', indexRouter);

db();

app.listen(port, () => {
    console.log(`Server is running : http://localhost:${port}`);
});

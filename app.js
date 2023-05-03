require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const fileUpload = require('express-fileupload')

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const authenticationRouter = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth');
const formRouter = require('./routes/form');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const path = require('path')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);


app.use(express.static('./public'))

app.get('/formList', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/formList.html'))
})

app.get('/singleList', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/singleList.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/login.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/register.html'))
})


app.use(express.json());
app.use(fileUpload({ useTempFiles: true }))

app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/form', formRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 2300;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

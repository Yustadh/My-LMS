import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoute from './Routes/Quiz/loginRoute.js';
import registerRoute from './Routes/Quiz/registerRoute.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 8000;

app.get('/',cors(), (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/quiz', loginRoute);
app.use('/api/quiz', registerRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
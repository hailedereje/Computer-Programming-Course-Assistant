import express from 'express'; 
import dotenv from 'dotenv'; 
dotenv.config();

const {PORT} = process.env;
const app = express();
const port = PORT || 3000

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})
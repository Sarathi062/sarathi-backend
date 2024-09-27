// index.js
import express from 'express'; 
import ConnectDB from './ConnectDB.js'; 
import router from './Router.js';
import cors from 'cors';
import config from "./utils/config.js";

const app = express(); 
const PORT = config.PORT;

app.use(cors());
app.use(express.json());

app.use('/', router);

// Connect to the database and start the server
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to the port http://localhost:${PORT}/`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

const express = require('express');
const cors = require('cors');
const bodyParder = require('body-parser');

//route
const invoice = require('./Routes/Invoice');
const user = require('./Routes/User');
const lottery = require('./Routes/Lottery');
const ngud = require('./Routes/Ngud')

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParder.json());


app.use('/invoice',invoice);
app.use('/user',user);
app.use('/lottery',lottery);
app.use('/ngud',ngud);


const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log('server is running ', port);
});
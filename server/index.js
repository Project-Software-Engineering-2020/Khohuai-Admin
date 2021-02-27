const express = require('express');

//route
const lotteryRoute = require('./Routes/Lottery');
const userRoute = require('./Routes/User');


const app = express();


app.use('/user',userRoute);
app.use('/lottery',lotteryRoute);









const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log('server is running ', port);
});
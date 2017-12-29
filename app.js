const express = require('express');
const PORT = process.env.PORT || 9000;

const app= express();


app.listen(PORT, ()=>{
    console.log('Server is Running at localhost:' + PORT);
});
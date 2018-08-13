const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./api')

const app = express();
app.use(bodyParser.json());
app.use('/api',userRouter);

app.listen(9000,function(){
    console.log('Node app start at port 9000');
})

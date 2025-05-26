import 'dotenv/config';
import express from 'express';
import logger from './logger.js';
import morgan  from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

// app.get("/", (req, res) =>{
//     res.send("Hello form ritik and its computer..");
// });

// app.get("/twitter", (req, res) =>{
//     res.send("ritik2177");
// });

// app.use(express.json());
let teaData = [];
let nextId = 1;


//add a new tea
app.post('/teas', (req, res) => {
    //logger.info('A POST is made to add a new tea');
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).json(newTea);
});

// get all teas
app.get('/teas', (req, res) =>{
    res.status(200).send(teaData);
});

// get tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('tea not found');
    }
    res.status(200).send(tea);
});

// update tea by id
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('tea not found');
    }
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea);
    // res.status(200).send(tea);
});

// delete tea by id
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
  if(index === -1) {
    return res.status(404).send('tea not found');
  }
  teaData.splice(index, 1);
  return res.status(204).send('tea deleted');
});

app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
});

const express = require('express');
const { getRandomElement, getElementById, getIndexById, updateElement, createElement } = require('./utils');

const Quote = require('./models/quote');

quotesRouter = express.Router();

quotesRouter.get('/', (req, res, next)=> {
  if(req.query.person){
    const author = req.query.person;
    Quote.find({person: author}).then(doc => {
      res.status(200).send({quotes:doc})
    });
      
  } else {
    Quote.find({}).then(doc => {
      res.status(200).send({quotes: doc})
    });   
  }
});

quotesRouter.get('/random', async (req, res, next) => {
  try{
    const count = await Quote.estimatedDocumentCount();
    const random = Math.floor(Math.random()*count);
    const RandomElement = await Quote.findOne().skip(random).exec();
    
    if(RandomElement)
    {
      res.status(200).send({quote:RandomElement});
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({err: err});
  }

});

quotesRouter.post('/', async (req, res, next) => {
 try {
    if(req.query.person && req.query.quote){
      const myQuote = new Quote({
        quote: req.query.quote, 
        person: req.query.person
      });
      await myQuote.save().then(doc => {
        if(doc) {
          res.status(201).send({quote:doc})
        }else {
          res.status(400).send();
        }
      });
    }
  } catch (err) {
    res.send({message: err});
  }
});

quotesRouter.put('/:id/', (req, res, next)=>{


});

quotesRouter.delete('/:id/', (req, res, next)=>{


});

module.exports = quotesRouter;
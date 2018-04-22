const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//logger
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
//   //if next() isnt used no other calls can connect
// });

// moved static here so it doesnt serve the files before
// the maintenance page gets displayed
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// request, response
app.get('/', (req,res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render('home', {
    pageTitle: 'HomePage',
    welcMessage: 'Welcome to the homepage'
  })
});

app.get('/about', (req,res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to fullfil this request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});

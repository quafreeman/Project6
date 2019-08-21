let express= require('express');
let app= express();
const pug= require('pug');
const data= require('./data.json');


//** */Sets view engine to pug
app.set('view engine', 'pug')

//** */Shows static files in the public folder
app.use('/static', express.static('public'));

//** */Sets the about render to the about page.
app.get('/about', (req, res) => {
  res.render('about')
})


//** */Sets index route for app
app.get('/', (req, res) => {
  res.render('index', {projects: data.projects});
})

//** */Sets the project route for the app
app.get('/project/:id', (req, res) => {
  let projectIndex = req.params.id - 1;
  res.render('project', {project: data.projects[projectIndex]});
});

//** */ Error handling middleware to utilize static
app.use((req, res, next) => {
  const err = new Error('Error: Sorry, the page requested can not be found');
  err.status = 404;
  next(err);
});

//** */Handles the errors in the app
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render('error', err);
  console.log("Error: Sorry, the page requested can not be found");
});

//** */Server listens for the app
app.listen(3000, ()=>{
  console.log('App running on port 3000')
});

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const Workout = require('./models/workout.js');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('views', './views');
app.use(methodOverride("_method"));

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// Database Connection Error/Success
mongoose.connection.on('error', (err) => console.log(err.message));
mongoose.connection.on('connected', () => console.log('Database Connected.'));
mongoose.connection.on('disconnected', () => console.log('Database Disconnected.'));

// Index Route
app.get('/', (req, res) => {
  res.redirect('/homepage');
});

app.get('/homepage' , (req, res) => {
  res.render('homepage.ejs');
});

app.get('/homepage/workouts', (req, res) => {
  res.render('workouts.ejs');
});

app.get('/homepage/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/homepage/signup', (req, res) => {
  res.render('signup.ejs');
});

// New route
app.get('/homepage/new', (req, res) =>{
  res.render('new.ejs');
});

// Delete Route
app.delete("/homepage/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/homepage");
  });
});

// Create Route
app.post('/homepage', (req, res) => {
  Workout.create(req.body, (error, createdWorkout) => {
    res.redirect('/homepage');
  });
});


// Update Route

// Edit Route
app.get("/homepage/:id/edit", (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render("edit.ejs", {
      workout : foundWorkout,
    });
  });
});

app.put("/homepage/:id/edit", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true,},
    (error, updatedWorkout) => {
      res.redirect(`/homepage/${req.params.id}`)
    });
});

// Show route
app.get('/homepage/:id', (req, res) => {
	Workout.findById(req.params.id, (err, foundWorkout) => {
		res.render('show.ejs', {
			workout: foundWorkout,
		});
	});
});


// Listener
app.listen(process.env.PORT, () => console.log(`Server is running.`));

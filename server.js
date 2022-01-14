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
  Workout.find({}, (error, allWorkouts) => {
		res.render('workouts.ejs', {
			workouts : allWorkouts,
		});
	});
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
app.delete("/workouts/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/homepage/workouts");
  });
});

// Create Route
app.post('/workouts', (req, res) => {
  // let exerciseArr = [];
  // let repsAndSetsArr = [];
  // let index = 0;
  // for (var key in object) {
  //   if (key.toString() === `exercise`) {
  //     for (let i = 0; i < key.length; i++) {
  //       if (object[key][i] != null) {
  //         exerciseArr.push(object[key][i]);
  //         repsAndSetsArr.push(object["repsAndSets"][i]);
  //       }
  //     }
  //   }
  //   index = index + 1;
  // }
  // console.log(exerciseArr);
  // console.log(repsAndSetsArr);
  // object["exercise"] = exerciseArr;
  // console.log(object);
  Workout.create(req.body, (error, createdWorkout) => {
    res.redirect('/homepage/workouts');
  });
});


// Update Route

// Edit Route
app.get("/homepage/workouts/:id/edit", (req, res) => {
  Workout.findById(req.params.id, (error, foundWorkout) => {
    res.render("edit.ejs", {
      workout : foundWorkout,
    });
  });
});

app.put("/homepage/workouts/:id/edit", (req, res) => {
  console.log(req.body);
  Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true,},
    (error, updatedWorkout) => {
      res.redirect(`/homepage/workouts/${req.params.id}`);
    });
});

// Show route
app.get('/homepage/workouts/:id', (req, res) => {
	Workout.findById(req.params.id, (err, foundWorkout) => {
		res.render('workout-view.ejs', {
			workout: foundWorkout,
		});
	});
});


// Listener
app.listen(process.env.PORT, () => console.log(`Server is running.`));

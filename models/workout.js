const mongooe = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
	name: String,
  description: String,
  exercises: Array,
  repsAndSets: Array
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;

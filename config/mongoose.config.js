import mongoose from 'mongoose';
import employee from '../dbModels/Employee.model';
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test',(err,res)=>{
     if (err) {
  console.log ('ERROR connecting to MongoDB : ' + err);
  } else {
  console.log ('Connected to: MongoDB');
  }
});
mongoose.set('debug', true);
module.exports = mongoose;




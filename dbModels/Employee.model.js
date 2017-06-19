import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const companySchema = new Schema({name:String,location:String});

const employeeSchema = new Schema({ name: String,job: String, age: String,company: companySchema});

const employee = mongoose.model('employee', employeeSchema);


module.exports = {
    employeeModel:employee
}
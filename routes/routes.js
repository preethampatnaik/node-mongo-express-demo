import Model from '../dbModels/Employee.model';
const emp = Model.employeeModel;
const routes = {
    fetchEmployees:function(req,res,next){
        //id:1 means asc
        emp.find().sort({_id:1}).exec((err,emp)=>{
            if(err) return next(err);
            res.send(emp);

        })
    },
    fetchEmployeeByName:(req,res,next)=>{
        emp.find({name:{$regex:new RegExp(req.body.name,'i')}}).exec((err,emp)=>{
            if(err) return next(err);
            res.status(200).send(emp);

        })
    },  
    fetchEmployeeById:(req,res,next)=>{
        emp.find({_id:req.params.id}).exec((err,emp)=>{
            if(err) return next(err);
            res.status(200).send(emp);

        })
    },
    saveEmployee:(req,res,next)=>{
       
       let newEmp = new emp({ name: req.body.name,job:req.body.job, age:req.body.age,company:{name:req.body.company.name,location:req.body.company.location}})

        newEmp.save((err,emp)=>{
            if(err) return next(err);
            res.send(emp);

        })
    },
    updateEmployeeInfo:(req,res,next)=>{
        emp.findOne({_id:req.params.id}).sort({_id:1}).exec((err,emp_doc)=>{
            if(err) return next(err);
            //to merge the body with already existing doc and update the changed props alone
            // o1 : {a:1} ,o2 :{a:1,b:2} Object.assign(o1,o2) => o1 = {a:1,b:2} ,o2 = {a:1,b2}
            if(emp_doc){
            Object.assign(emp_doc,req.body);
            emp_doc.save();
            res.status(201).send(emp_doc);
            }else{
            res.status(200).send(`No record found with id => ${req.params.id}` );
            }
        })
    },
    deleteEmployee:(req,res,next)=>{
       
        emp.findOneAndRemove({_id:req.params.id}).exec((err,deleted_doc)=>{
            if(err) return next(err);
            if(deleted_doc)
            res.status(200).send(`document with id ${req.params.id} is removed successfully!`)
            else
            res.status(200).send(`No record found with id => ${req.params.id}` );
        })
    }
}
emp.findOne().remove
module.exports = routes;
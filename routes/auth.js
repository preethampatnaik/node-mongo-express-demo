import mongoose from 'mongoose';
const schema = mongoose.Schema;
const authSchema = new schema({id:String,password:String})
const authModel =  mongoose.model('user',authSchema);
module.exports = {
    
    authUser:(req,res,next)=>{
        
        authModel.find({id:req.headers.username,password:req.headers.password}).exec((err,docs)=>{
               if(err) return next(err);
               //console.log("count ==>"+count)
               
                docs instanceof Array  && docs.length==1 ?  res.status(200).end() :  res.status(401).send("unauthorized");
        })
    },
    authUserLocally:(req,res,next)=>{
        
        authModel.find({id:req.headers.username,password:req.headers.password}).exec((err,docs)=>{
               if(err) return next(err);
               //console.log("count ==>"+count)
               
               return  docs instanceof Array  && docs.length==1 ? next() :  res.status(401).send("unauthorized");
        })
    },
    createUser:(req,res,next)=>{
         //check if id exists

          var idExists;

         authModel.find({id:req.body.username,password:req.body.password}).exec((err,docs)=>{
               if(err) return next(err);
               //console.log("count ==>"+count)
               
               idExists = docs instanceof Array  && docs.length>0 ?  true :  false;
                if(idExists){
                res.status(500).send(`<b>User with  username:' ${req.body.username}  'already exists</b>`).end();
                
                }else{
                     //create id
              const newUser = new authModel({id:req.body.username,password:req.body.password})
                newUser.save((err,doc)=>{
                    if(err) return next(err);

                    res.status(200).send(`User with username: '  ${req.body.username}   '   is created successfully`)
                })
                }
             
        })
         
       
           
        }
      

    }

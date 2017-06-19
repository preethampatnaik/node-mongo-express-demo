import express from 'express';
import employee from '../dbModels/Employee.model'
import routes from './routes';
import authMethods from './auth'
const router = express.Router();
router.get('/employees',routes.fetchEmployees);
router.get('/employee/:id',routes.fetchEmployeeById)
router.post('/employee',routes.saveEmployee)
router.put('/employee/:id',routes.updateEmployeeInfo)
router.delete('/employee/:id',routes.deleteEmployee)

router.get('/auth',authMethods.authUser);
router.post('/user/create',authMethods.createUser);
module.exports = router;


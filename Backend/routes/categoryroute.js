import {Router} from 'express'
import auth from '../middleware/auth.js'
import { Addcategory, deletecategory, getcategory, updatecategory } from '../controllers/Categorymodel.js'
const categoryrouter = Router()

categoryrouter.post('/add-category',auth,Addcategory)
categoryrouter.get('/get',getcategory)
categoryrouter.put('/update',auth,updatecategory)
categoryrouter.delete('/deletecategory',auth,deletecategory)

export default categoryrouter
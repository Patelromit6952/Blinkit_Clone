import Router from 'express'
import auth from '../middleware/auth.js'
import { addsubcategory, deletesubcategory, getsubcategory, updatesubcategory } from '../controllers/Subcategorycontroller.js'

const subcategoryRouter = Router()

subcategoryRouter.post('/create',auth,addsubcategory)
subcategoryRouter.post('/get',getsubcategory)
subcategoryRouter.put('/update',auth,updatesubcategory)
subcategoryRouter.delete('/delete',auth,deletesubcategory)
export default subcategoryRouter
import {Router} from 'express'
import auth from '../middleware/auth.js'
import uploadimage from '../controllers/uploadimage.js'
import upload from '../middleware/multer.js'

const uploadrouter = Router()

uploadrouter.post("/upload",auth,upload.single("image"),uploadimage)

export default uploadrouter
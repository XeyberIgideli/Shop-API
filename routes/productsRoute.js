import express from 'express'
import {getAllProducts,sendData} from "../controllers/productsController.js"

const router = express.Router()

router.get('/',getAllProducts)
router.get('/send',sendData)

export default router


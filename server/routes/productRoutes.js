const express = require('express')
const { jwtAuthMiddleware } = require('../jwt')
const router = express.Router()

router.post('/add', jwtAuthMiddleware ,async (req,res)=>{

})

module.exports = router
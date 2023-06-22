const express=require('express')
const router= express.Router()

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_items,global.food_category])
    } catch (error) {
        console.error(error.messsage);
        res.send("Server errror")
    }
})

module.exports= router;
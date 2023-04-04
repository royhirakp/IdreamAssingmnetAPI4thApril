const express = require('express')
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
// const RecipiModel = require("../models/RecipyModel")
const imageModel = require('../Model/ImageModel')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

// FileStore IMAGE
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/image')
    },
    filename:(req,file,cb)=>{
      cb(null, file.originalname)
    }
  })
const uplode = multer({storage: storage})

router.post('/', uplode.single('image') , async (req,res)=>{
    console.log(req.body,'req.body')
    // let ingridents = req.body.ingredients;
    // ingridents = ingridents.split(',')
    // console.log(ingridents)
    // console.log(req.file,'req.file')
    try {
        const imageData = await imageModel.create({
            // title: req.body.title,
            // author: req.body.author,
            label: req.body.label,
            image: {
                data: fs.readFileSync('public/image/' + req.file.filename),
                contentType: 'image/png'
              },    
            // ingredients: ingridents,
            // directions:  req.body.directions,
            // user: req.userID
        })
        res.json({
            status:"sucsess",
            imageData
        })
    } catch (error) {
        res.status(500).json({
            status:"error",
           messege: error.messege
        })
    }
})


router.get('/', async (req,res)=>{
    try {
        // console.log("get route form u=imageroute.js working and ")
        let imagedata = await imageModel.find();
        console.log("recipi count: ",imagedata.length)
    res.json({
        status:'susecss',
        imagedata
    })
        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            messege: error.messege
        })        
    }
})

router.get('/search/:label', async (req,res)=>{
    try {
        console.log("GET 222222222222 ",req.params.label)
        //  = await imageModel.find({label:req.params.label});
        let imagedata = await imageModel.find({label:{
            $regex: new RegExp(req.params.label)
        }});
        console.log("recipi count: ",imagedata.length)
        res.json({
            status:'susecss',
            imagedata
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            messege: error.messege
        })        
    }
})

router.delete('/:id', async (req,res)=>{
    console.log('req.params====', req.params.id)
    try {
        console.log('delete route ')
        if(req.body.password !== ""){
            let data= await imageModel.deleteOne({_id: req.params.id})
            res.status(204).json({
                status:"deleted!",
                data
            })
        }else{
            req.status(502).json({
                status:"falid!",
                messege: "give your password/ give corrent passowrd"
            })
        }
       
    } catch (error) {
        res.json(error)
    }
})
//get a particuler recipi

// router.get('/:id', async (req,res)=>{
//     try {
//         // console.log(req.userID)
//         let recipi = await RecipiModel.find({_id:req.params.id});
//         console.log("recipi count: ",recipi.length)
//     res.json({
//         status:'susecss',
//         recipi
//     })
        
//     } catch (error) {
//         res.status(400).json({
//             status: 'failed',
//             messege: error.messege
//         })        
//     }
// })

module.exports = router;
const multer=require("multer")
const uploadController=require("express").Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.filename)
    }
})
const upload=multer({
    storage
})

uploadController.post("/image",upload.single("image"),async(req,res)=>{
    try {
      return res.status(200).json("file uploaded successfully")  
    } catch (error) {
      throw res.status(500).json(error.message)  
    }
})
module.exports=uploadController
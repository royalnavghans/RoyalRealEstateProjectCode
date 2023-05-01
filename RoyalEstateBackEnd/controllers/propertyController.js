const Property=require("../models/Property")
const PropertyController=require("express").Router()
const verifyToken=require("../middlewares/verifyToken")

//getaAll
PropertyController.get("/getAll",async(req,res)=>{
    try {
        const properties=await Property.find({})
    return res.status(200).json(properties)
    } catch (error) {
       throw res.status(500).json("No data found "+error.message) 
    }
})

//get Featured

PropertyController.get("/find/featured",async(req,res)=>{
    try {
        const featuredProperties=await Property.find({featured:true}).populate("currentOwner","-password")
    return res.status(200).json(featuredProperties)
    } catch (error) {
       throw res.status(500).json({msg:"No such types found"}) 
    }
})
//get all from specs

PropertyController.get("/find",async(req,res)=>{
    const type=req.query
    try {
        if(type){
        const properties=await Property.find(type).populate("currentOwner","-password")
    return res.status(200).json(properties)
        }else{
            throw res.status(500).json({msg:"No such type found"})
        }
    } catch (error) {
       throw res.status(500).json("No data found "+error.message) 
    }
})
//get counts of types 
PropertyController.get("/find/types",async(req,res)=>{
    try {
      const beactTypes=await Property.countDocuments({type:"beach"})
      const mountainTypes=await Property.countDocuments({type:"mountain"})
      const villageTypes=await Property.countDocuments({type:"village"})
    return res.status(200).json({
        beach:beactTypes,
        mountain:mountainTypes,
        village:villageTypes
    })
    } catch (error) {
       throw res.status(500).json("No data found "+error.message) 
    }
})
//get individual props

PropertyController.get("/find/:id",async(req,res)=>{
    try {
        const properties=await Property.findById(req.params.id).populate("currentOwner","-password")
   if(properties){
    throw new Error("No such a Property Found")
   }else{
    return res.status(200).json(properties)
   }
        
    } catch (error) {
       throw res.status(500).json("No data found "+error.message) 
    }
})

//create a props

PropertyController.post("/",verifyToken,async(req,res)=>{
    try {
        const newProperty=await Property.create({...req.body, currentOwner: req.user.id})
        return res.status(201).json(newProperty)
    } catch (error) {
       throw res.status(500).json(error.message) 
    }
})

//update props
PropertyController.put("/:id",verifyToken,async(req,res)=>{
    try {
        const Propertys=await Property.findById(req.params.id)
        if(Propertys.currentOwner.toString() !== req.user.id.toString()){
            throw new Error("You are not allowed to update other people property")
        }else{
            const updatedProperty=await Property.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            )

            return res.status(200).json(updatedProperty)
        }
    } catch (error) {
       throw res.status(500).json(error.message) 
    }
})
//delete props

PropertyController.delete("/:id",verifyToken,async(req,res)=>{
try {
    const property =await Property.findById(req.params.id)
    if(property.currentOwner !== req.user.id){
        throw new Error("You are not allowed to delete other people properties")

    }else{
       await property.delete ()
       return res.status(200).json({msg:"Successfully deleted property"})
    }
} catch (error) {
    throw res.status(500).json(error.message)

}
})
module.exports=PropertyController
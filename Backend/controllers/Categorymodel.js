import categoryModel from "../models/categorymodel.js";
import subCategoryModel from "../models/subcategorymodel.js"
import productModel from "../models/productmodel.js"

export const Addcategory = async(req,res) => {
    try {
        
        const {name,image} = req.body
        // console.log(name,image);
        
        if(!name || !image) {
            return({
                message:"Enter required fields",
                error:true,
                success:false
            })
        }
        const addcategory = new categoryModel({
            name,
            image
        })

        const savecategory = await addcategory.save()

        if(!savecategory) {
            return res.status(500).json({
                message:"category not created",
                error:true,
                success:false
            }) 
        }
        return res.status(200).json({
            message:"category addded successfully",
            data : savecategory,
            error:false,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export const getcategory = async(req,res) => {
    try {
        const data = await categoryModel.find().sort({ createdAt : -1})
        return res.json({
            data:data,
            error:false,
            success:true
        })
        
    } catch (error) {
     return res.status(500).json({
        message:error.message || error,
        error:true,
        success:false
     })   
    }
}

export const updatecategory = async (req,res) => {
    try {
        const {_id,name,image} = req.body

        const update = await categoryModel.updateOne({
            _id : _id,
        },{
            name,
            image
        })

        return res.json({
            message:"Update category successfully",
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export const deletecategory = async (req,res) =>{
    try {
        const { _id } = req.body

        const checksubcategory = await subCategoryModel.find({
            category:{
                "$in": [ _id ]
            }
        }).countDocuments()

        const checkproducts = await productModel.find({
            category:{
                "$in": [ _id ]
            }
        }).countDocuments()

        if(checksubcategory > 0 || checkproducts > 0){
            return res.status(400).json({
                message:"Category is already use can't delete ",
                error:true,
                success:false
            })
        }

        const deletecategory = await categoryModel.findByIdAndDelete({ _id : _id })

        return res.json({
            message:"Category deleted successfully",
            error:false,
            data:deletecategory,
            success:true
        })

    } catch (error) {
        return res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
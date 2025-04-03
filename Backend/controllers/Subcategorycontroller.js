import e from "express";
import subCategoryModel from "../models/subcategorymodel.js";

export const addsubcategory = async (req,res) => {
    try {
        const {name,image,category} = req.body

        if(!name && !image && !category) {
            return res.status(400).json({
                message:"Provide name,image,category",
                error:true,
                success:false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const createcategory = new subCategoryModel(payload)
        const save = await createcategory.save()

        return res.status(200).json({
            message:"Subcategory added successfully",
            data:save,
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

export const getsubcategory = async (req,res) => {
    try {
        const data = await subCategoryModel.find().sort({crearedAt : -1}).populate('category')
        return res.json({
            message:"sun category created successfully",
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

export const updatesubcategory = async (req,res) => {
    try {
        const {_id,name,image,category} = req.body
        
        const checksub = await subCategoryModel.findById(_id)

        if(!checksub){
            return res.status(500).json({
                message:"check your id",
                error:true,
                success:false
            })
        }

        const updatesubcategory = await subCategoryModel.findByIdAndUpdate(_id,{
            name,
            image,
            category
        })

        return res.json({
            message:"Subcategory updated successfully",
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

export const deletesubcategory = async (req,res) => {
    try {
        const {_id} = req.body
        const deletesub = await subCategoryModel.findByIdAndDelete(_id)

        return res.json({
            message:"Item Deleted Successfully",
            data:deletesub,
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
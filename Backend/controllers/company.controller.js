import { Company } from "../models/company.model.js";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


//Code for Register company:-
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                status: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You cant't register same company",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


//->Now code for returning all companies:-
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in userId
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not Found",
                success: false
            })
        }
       
        return res.status(200).json({
              companies,  //Yaha companies return ho raha ha tu frontend ma bi iss pa companies hi retun hoga(Same name). 
              success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}

//->Get company by id:-
export const getCompanyById = async (req, res) => {
    try {
        //param:- An object containing parameter values parsed from the URL path. 
        // For example if you have the route /user/:name , then the "name" from 
        // the URL path wil be available as req.params.name .
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            res.status(404).json({
                message: "Company not Found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

//->Update company Information:-

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
    // console.log( name, description, website, location);    

//Cloudinary part:-(cloudinary part ham file ka data(image,pdf..etc) ko upload,store karna lia karta ha)
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        
    const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: "false"
            })
        }
        return res.status(200).json({
            message: "Company information updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

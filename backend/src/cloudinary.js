import {v2 as cloudinary} from "cloudinary"


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const uploadonCloudinary=async(localfilepath)=>{
    try {
        if(!localfilepath)return null

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
       return response
    } catch (error) {
        return null
    }
}
export default uploadonCloudinary
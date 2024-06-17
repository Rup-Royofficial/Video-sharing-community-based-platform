import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs' // given by default in nodejs, helps in reading, writing, removing files, fs : filesystem



// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// file stays temporarily in the server then is moved to cloudinary, to tackle issues regarding faults while uploading from the client side
const uploadOnCloudinary = async (localeFilePath) => {
    try {
        // if there is not file path at all, then return null
        if(!localeFilePath) return null

        // upload file on cloudinary 
        // It attempts to upload the file to Cloudinary using cloudinary.uploader.upload.
        // The resource_type: "auto" option is used, which allows Cloudinary to automatically determine the file type (image, video, etc.).
        const response = await cloudinary.uploader.upload(localeFilePath, { // provide upload options here
            resource_type: "auto", 
        })



        // upon successful file upload
        // it logs the URL of the uploaded file and returns the response from Cloudinary.
        console.log("File has been successfully uploaded to cloudinary", response.url);
        fs.unlinkSync(localeFilePath);
        return response



    } catch (error) {
        // error will occur when the file while is present in the server now, is not properly uploaded to cloudinary
        // ideally that file from the server should be removed for a safe cleaning purpose as it might be corrupted etc ...

        fs.unlinkSync(localeFilePath) //removes the locally saved temporary file as the upload operation failed
        return null
    }
}

export { uploadOnCloudinary }



// (async function() {

    
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
    
// })();
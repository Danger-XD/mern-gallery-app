import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Validate Cloudinary environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.log("Cloudinary environment variables not found");
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    // console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    //fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    // delete from cloudinary: https://cloudinary.com/documentation/delete_assets
    // to delete one authenticated file
    // const result = await cloudinary.uploader.destroy(publicId,{resource_type:"auto",type:"authenticated"})
    // to delete multiple files
    // const result = await cloudinary.api.delete_resources([publicId1, publicId2, publicId3],{resource_type:"auto",type:"authenticated"})
    if (!publicId) return null;
    // to delete one file
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error.message);
    return null;
  }
};
export { uploadOnCloudinary, deleteFromCloudinary };

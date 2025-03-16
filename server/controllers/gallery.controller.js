import imageModel from "../models/image.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utilities/cloudinary.js";
import userModel from "./../models/users.model.js";

export const createPost = async (req, res) => {
  try {
    const { id } = req.user;
    //check field
    const { caption, visible } = req.body;
    const localFilePath = req.file?.path;
    if (!localFilePath || !caption || !visible) {
      return res
        .status(400)
        .json({ success: false, message: "Required field is empty" });
    }
    const image = await uploadOnCloudinary(localFilePath);
    const postData = await imageModel.create({
      userId: id,
      caption,
      visible,
      imageUrl: image.url,
      publicId: image.public_id,
    });
    if (!postData) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create post" });
    }
    return res.status(200).json({ success: true, data: postData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error: " + error.message });
  }
};
export const updateImagePost = async (req, res) => {
  try {
    // get post id
    const { postId } = req.params;
    const post = await imageModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    //check field
    const { caption, visible } = req.body;
    const postData = await imageModel.findByIdAndUpdate(
      postId,
      { $set: { caption, visible } },
      { new: true }
    );

    if (!postData) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update post" });
    }
    return res.status(200).json({ success: true, data: postData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error: " + error.message });
  }
};
export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const authId = req.user ? req.user.id : null;
    let query = { userId };
    // If not authenticated, show only public images
    if (!authId || authId !== userId) {
      query.visible = "public";
    }
    const images = await imageModel.find(query);
    if (!images) {
      return res
        .status(404)
        .json({ success: false, message: "No images found for this user" });
    }
    return res.status(200).json({
      success: true,
      userInfo: user,
      data: images,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error: " + error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default 10 images per page
    const skip = (page - 1) * limit;

    const images = await imageModel
      .find({ visible: "public" })
      .select("-userId -visible -_id")
      .skip(skip)
      .limit(limit);

    const totalCount = await imageModel.countDocuments({ visible: "public" });

    return res.status(200).json({
      success: true,
      total: totalCount,
      page,
      limit,
      data: images,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error: " + error.message });
  }
};

// export const getAllPosts = async (req, res) => {
//   try {
//     const images = await imageModel
//       .find({ visible: "public" })
//       .select("-userId -visible -_id");
//     if (!images) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No images found" });
//     }
//     return res.status(200).json({ success: true, data: images });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "error: " + error.message });
//   }
// };
export const deleteUserPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await imageModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
    const deleteOnCloud = await deleteFromCloudinary(post.publicId);
    if (!deleteOnCloud) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete post" });
    }
    await post.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error: " + error.message });
  }
};

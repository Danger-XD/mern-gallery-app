import { Router } from "express";
const router = Router();
import authMiddleware from "../middlewares/auth.middleware.js";
import * as galleryController from "../controllers/gallery.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// C: post image by user
router.route("/upload").post(
  authMiddleware,
  upload.single("postImage"), //image file name
  galleryController.createPost
);

// R:show all the public images for gallery
router.route("/profile/:userId").get(galleryController.getUserPost);
router
  .route("/profile-all/:userId")
  .get(authMiddleware, galleryController.getUserPost);

// U:update a post
router
  .route("/update/:postId")
  .patch(authMiddleware, galleryController.updateImagePost);

// D:delete a post
router
  .route("/delete-post/:postId")
  .delete(authMiddleware, galleryController.deleteUserPost);
  
// show the users images
router.route("/all-posts").get(galleryController.getAllPosts);

export default router;

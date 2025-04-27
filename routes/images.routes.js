const { Router } = require("express");
const {
  getImagesAll,
  getOneImagesById,
  createImages,
  updateImagesById,
  removeImagesById,
} = require("../controllers/images.controller");

let imagesRouter = Router();

imagesRouter.get("/all", getImagesAll);
imagesRouter.get("/:id", getOneImagesById);
imagesRouter.post("/create", createImages);
imagesRouter.patch("/:id", updateImagesById);
imagesRouter.delete("/:id", removeImagesById);

module.exports = imagesRouter;

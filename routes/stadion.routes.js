const { Router } = require("express");
const { getStadiumAll,
    getOneStadiumById,
    createStadium,
    updateStadiumById,
    removeStadiumById 
    } = require("../controllers/stadium.controller");

let stadiumRouter = Router();

stadiumRouter.get("/all", getStadiumAll);
stadiumRouter.get("/:id", getOneStadiumById);
stadiumRouter.post("/create", createStadium);
stadiumRouter.patch("/:id", updateStadiumById);
stadiumRouter.delete("/:id", removeStadiumById);

module.exports = stadiumRouter;
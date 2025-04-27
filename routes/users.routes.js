const { createUser, getAllUsers, getUserById, removeUserById, updateUserById } = require("../controllers/user.controller")

const router = require("express").Router()

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.delete('/:id', removeUserById),
router.patch("/:id", updateUserById)

module.exports = router;

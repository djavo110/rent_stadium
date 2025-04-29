const { createUser, getAllUsers, getUserById, removeUserById, updateUserById, getUserByAnyParams, findOwnerStadium, findOwnerUser, findOwnerPhone } = require("../controllers/users.controller");
const { getAllUsersByRole } = require("../controllers/users.controller");

const router = require("express").Router()

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/role", getAllUsersByRole);
router.get("/any", getUserByAnyParams);
router.get("/findOwnerStadium", findOwnerStadium);
router.get("/findOwnerPhone", findOwnerPhone);
router.get("/:id", getUserById);
router.delete('/:id', removeUserById),
router.patch("/:id", updateUserById),

module.exports = router;

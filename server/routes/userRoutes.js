const { registerUser, loginUser,setAvatar,getContacts, addContact} = require('../controllers/userController');
const auth=require("../middleware/auth");
const router=require('express').Router();




router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/setAvatar",auth,setAvatar);
router.get("/contacts",auth,getContacts);
router.post("/contacts/addContact/contactId",addContact);

module.exports=router;



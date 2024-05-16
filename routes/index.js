
const passport = require("passport");

const router = require("express").Router();
const checkLogin = require("../routes/checkLogin");
const getContacsRoute = require("../routes/getContacts");
const loginRoute = require("../routes/loginRoute");
const registerRouter = require("../routes/registerRoute");
const logoutRouter = require("../routes/logoutRoute");
/*
router.use("/" , (req , res )=>{
    const root = __dirname.substring(0,__dirname.lastIndexOf("\\"));
    console.log(  );
    res.sendFile(`${root}\\public\\index.html`)})
    */
router.use("/checkLogin", checkLogin);
router.use("/getContacts", getContacsRoute);
router.use("/login", passport.authenticate("local"), loginRoute);
router.use("/register", registerRouter);
router.use("/logout", logoutRouter);
const path = require("path")
router.use("/",(req,res)=>{res.json("asdasdasd")})

router.use( "/" , (req , res , next)=> {
	let filePath = path.join(__dirname, '..', 'front-end-build', 'index.html')
	res.sendFile( filePath );
} );

module.exports = router;


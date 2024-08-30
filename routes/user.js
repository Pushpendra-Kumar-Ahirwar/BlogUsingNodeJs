const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.post("/signup", async(req, res) => {
    const { fullname, email, password } = req.body;
    const exitingEmail = await User.findOne({ email });
    if (exitingEmail) {
        return res.render("signup", {
            error: "Email Already exit",
        });
    }
    await User.create({
        fullname,
        email,
        password,
    });
    return res.render("signin", {
        sucsess: "Signup Sucsessfull please signin",
    });
});

router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.MatchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        res.render("signin", {
            error: "Incorrect Email or password",
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

module.exports = router;
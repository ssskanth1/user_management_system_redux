const { findUsingid } = require("../controllers/Functions");
const { Admin } = require("../model/adminSchema");
const { User } = require("../model/userSchema");

const userAuth = async (req, res, next) => {
    try {
        const data = req.user
        const user = await findUsingid(User, data._id)
        console.log("userrrrrrrrrrr"+user)
        if (!user) {
            return res.status(204).json({ status: true })
        }
        if (!user.status) {
            return res.status(205).json({ status: true })
        }
        const details = {
            email: user.email,
            name: user.name,
            _id: user._id,
            image: user.profile?`http://localhost:4000/Profile/${user.profile}`:`http://localhost:4000/Profile/download.jpg`,
            gender: user.gender,
            age: user.age,
            username: user.username
        }
        return res.status(200).json({ user: details })
    } catch (e) {
        console.error(e);
        res.status(404).json({ status: true })
    }
}


const adminAuth = async (req, res, next) => {
    const data = req.admin
    const admin = await findUsingid(Admin, data._id)
    if (!admin) return res.status(201).json({ status: true })
    const details = { name: admin.name, email: admin.email, user: admin.user }
    return res.status(200).json({ admin: details })
}

module.exports = {
    userAuth,
    adminAuth
}
const { findOneData,Insert,Hash,findUsingid,Compare,findByAndUpdate} = require('../controllers/Functions')
const { User } =require('../model/userSchema');
const { Admin } = require('../model/adminSchema');
const { createPayload } = require("../controllers/JWT");
const multer = require("multer");


const register = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;

        const data = await findOneData(User,{email:email});
        console.log(data);
        if(data){
            return res.status(201).json({status:true})
        }
        const hashed = await Hash(password);
        const insert = {
            name:name,
            email:email,
            password:hashed
        }
        const userDetails = await Insert(User,insert);
        return res.status(200).json({status:true})

    }catch(e) {
        console.error(e);
        res.status(404).json({ status: true })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findOneData(User, { email: email });

        if (!user) return res.status(203).json({ status: true });
        if (!await Compare(password, user.password)) return res.status(202).json({ status: true });
        if (!user.status) return res.status(201).json({ status: true });

        const data = {
            email: user.email,
            _id: user._id,
        };

        const payload = await createPayload(data);
        return res.status(200).json({ payload: payload });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
};

const updateImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: updateImage })


const afterUpdate = async (req, res, next) => {
    const { id } = req.body
    await findByAndUpdate(User, id, { $set: { profile: id + '.jpg' } })
    res.status(200).json({ status: true })
}

const changeProfile = async (req, res, next) => {
    const { name, username, id, gender } = req.body
    await findByAndUpdate(User, id, { $set: { name, username, gender } })
    res.status(200).json({ status: true })
}


module.exports = {register,login,changeProfile,afterUpdate,upload,updateImage}
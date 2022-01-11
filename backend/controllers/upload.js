
const dbc = require('../utils/dbconnect')

exports.upload = (req, res, next) => {
    console.log(req)
    if(res){
        res.status(200).json({
            message: "Image upload successfully",
            url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
        console.log(res)
    }else{
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

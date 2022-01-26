
const dbc = require('../utils/dbconnect')

exports.upload = (req, res, next) => {
    if(res){
        res.status(200).json({
            message: "Image upload successfully",
            url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
    }else{
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

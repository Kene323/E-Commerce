const AppError = require("../AppError")


exports.DeveloperError = (err, res)=>{
    return res.status(500).jaon({
        error: err,
        message: err.message,
        status: err.statusCode
    })
}

exports.errorHandler = (req, res, err = App.error, next) => {
    DeveloperError(err, res)
}
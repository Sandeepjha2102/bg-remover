import multer from 'multer'

//disk storage configuration for multer
const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, `${Date.now()}+${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload
import multer from 'multer'

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/notes')
    },

    fileName: (req, file, cb) => {

        uniqueName = Date.now() + "-" + file.originalname
        cb(cb, uniqueName)
    } 
})

const upload = multer({
    
    storage,

    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith("image/")) {
            
            cb(null, true)
        
        } else {

            cb(new Error ("Only images files are allowed"))
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default upload
import multer from 'multer'
// cb : callback

const storage = multer.diskStorage({
    // req refers to request from the user, file if available is handled through this 'file' parameter below, 
    // which is why we use multer/express-file-upload
    destination: function (req, file, cb) {
      cb(null, './public/temp') // give the destination where u want to want to keep your uploaded files temporarily
    },
    filename: function (req, file, cb) {
/*
        if u want to name the uniquely, then use the below line:
           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
*/

        // below line returns original filename on callback of the func
        cb(null, file.originalname) // on an ideal note this is not a good practice/code in most application backends, as many users can have same-named files, 
        // then the initial file will keep getting overwritten, but since we are not keeping the files forever in our server, so it is not a problem

        // The reason, am still using this form is because the file will stay with me for a miniscule amount of time 
        // after which it will be uploaded to cloudinary and then it will be deleted from the local server

    }
  })
  
export  const upload = multer({ storage, })
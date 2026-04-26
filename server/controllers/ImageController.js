import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import UserModel from '../models/UserModel.js'


// controller fn to remove bg
const removeBgImage = async(req, res)=>{
    try{
        const{clerkId} = req.clerkId
        const user = await UserModel.findOne({clerkId})

        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        if(user.creditBalance === 0){
            return res.json({
                success: false,
                message: "Insufficient credits",
                creditBalance: user.creditBalance
            })
        }

        const imagePath = req.file.path
        //reading the image file
        const imageFile = fs.createReadStream(imagePath);

        //creating form data to send to clipdrop
        const formdata = new FormData()
        formdata.append('image_file', imageFile)

        //calling clipdrop api to remove bg
        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {headers: {
            'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer'
    })



    const base64Image = Buffer.from(data,'binary').toString('base64')
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

    await UserModel.findOneAndUpdate(user.id, {creditBalance: user.creditBalance - 1})


    res.json({
        success: true,
        resultImage,
        creditBalance: user.creditBalance-1,
        message: "Background removed successfully" 
    })


}  
    catch (error) {
        console.log(error.message)

        res.json({
            success: false,
            message: error.message
        })
    }
}

export {removeBgImage}
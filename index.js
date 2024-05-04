const express=require('express')
const mongoose=require('mongoose')
const {User }=require('./schema')
const App=express()
const bodyparser=require('body-parser')
App.use(bodyparser.json())
const cors = require('cors')
App.use(cors())


const port = process.env.PORT || 5000
async function connectiontoDB() {
    try {
        await mongoose.connect(`mongodb+srv://Hema__:hema123@cluster0.doyohtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
            //const port = 4000
        App.listen(port, function() {
            console.log(`Listening to port ${port}`)
        })
    } catch (error) {
        console.log("couldn'/t establish connection")
    }
}
connectiontoDB()
App.post('/user', async function(request, response) {
    try {
        await User.create({
            "name": request.body.name,
            "email": request.body.email,
            "password": request.body.password
        })
        response.status(201).json({ //status code is 200 when we create new 
            "Status": "Success",
            "message": "entry created"
        })
    } catch (error) {
        response.status(500).json({ //status code is 500 when we get a error ,because it is internal serverr error
            "Status": "Failure",
            "Msg": "couldn'\t add value"
        })
    }
    // console.log(request.body)
    // response.json({ "Status": "Added" })
})
App.get('/finduser', async function(request, response) {
    try {
        const Userdata = await User.find()
        response.status(200).json(Userdata)
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "msg": "couldn't find values",
            "Error": error
        })
    }
})
App.delete('/deleteuser/:id', async function(request, response) {
    const Userdata = User.findById(request.params)
    try {
        if (Userdata) {
            await User.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "Status": "Success",
                "message": "Deleted entry"
            })
        } else {
            response.status(200).json({
                "Status": "failure",
                "message": "Couldn'/t delete entry"
            })
        }
    } catch (error) {
        response.status(404).json({
            "Status": "Failure",
            "message": "couldn'/t delete entry",
            "error": error
        })
    }
})
App.patch('/updateuser/:id', async function(request, response) {

    const userentry = await User.findById(request.params.id)
    if (userentry) {
        try {
            await userentry.updateOne({
                "name": request.body.name,
                "email": request.body.email,
                "password": request.body.password
            })

            response.status(200).json({
                "Status": "Succuss",
                "message": "Updated"
            })
        } catch (error) {
            response.status(404).json({
                "status": "failure",
                "Message": "couldn'/t updated"
            })
        }
    } else {
        response.status(404).json({
            "Status": "failure",
            "Message": "couldn't updated"
        })
    }
})

//user details


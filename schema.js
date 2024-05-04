const mongoose=require('mongoose')
const express=require('express')
const QuizApplicationschema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    
})
const User=mongoose.model(`user_details`,QuizApplicationschema)
module.exports={ User }
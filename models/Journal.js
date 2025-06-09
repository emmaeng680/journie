const mongoose= require("mongoose");

// const date= ()=>{
//     let d= new Date();
//     return d;
// }

const JournalSchema= new mongoose.Schema({
    title: {
        required: [true,"Please add a title"],
        type: String,
        trim: true,
        maxlength: [50, "Title cannot exceed 50 characters"],
        default:"Untitled"
    },
    description:{
        type: String,
        required: [true, "Content cannot be empty"],
    },
    year:{
        type: Number,
        required: true
    },
    month:{
        type: Number,
        required: true
    },
    day:{
        type: Number,
        required: true
    }
})

module.exports= mongoose.models.Journal || mongoose.model("Journal",JournalSchema)

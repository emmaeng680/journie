import dbConnect from "../../../../dbConnect";
import Journal from "../../../../models/Journal";

dbConnect();

export default async (req, res)=>{
    const {method}= req;

    switch(method){
        case "GET": 
            try {
                const entries= await Journal.find({});
                if(!entries){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: entries})
            } catch (error) {
                res.status(400).json({success: false})
            }
        break;
        case "POST":
            try {
                const entry= await Journal.create(req.body);
                console.log(entry);
                res.status(201).json({success:true, data:entry})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false});
            break; 

    }
} 
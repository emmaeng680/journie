import dbConnect from "../../../../dbConnect";
import Journal from "../../../../models/Journal";

dbConnect();

export default async (req, res)=>{
    const {method, query:{id}}= req;

    switch(method){
        case "GET": 
            try {
                const entry= await Journal.findById(id);
                if(!entry){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: entry})
            } catch (error) {
                res.status(400).json({success: false})
            }
        break;
        case "PUT":
            try {
                const entry= await Journal.findByIdAndUpdate(id,req.body,{new:true, runValidators:true});
                if(!entry){
                   return res.status(400).json({success: false})
                }
                res.status(201).json({success:true, data:entry})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case "DELETE":
            try {
                const entry= await Journal.deleteOne({_id: id});
                if(!entry){
                    return res.status(400).json({success: false})
                }
                res.status(201).json({success:true, data:{}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false});
            break; 

    }
} 
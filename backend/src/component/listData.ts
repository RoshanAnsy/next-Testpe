import fs from "fs"
import { Request,Response } from "express";

const ListData = (req:Request, res:Response) => {
    try {
        // Create readable stream
        const readerStream = fs.createReadStream('./Data.json', "utf-8");

        if (!readerStream) {
            res.status(200).json({
                message: "File is empty",
                success: true
            });
        } 
            readerStream.pipe(res, { end: true });
        
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong while reading the file',
            success: false,
            err: err
        });
        console.log(`Something went wrong with the stream: ${err}`);
    }
};

export default ListData;


import multer, { StorageEngine } from 'multer';
import  GridFsStorage  from 'multer-gridfs-storage';
import { Request } from 'express';

interface CustomFile extends Express.Multer.File {
    originalname: string;
    mimetype: string;
}

const storage: StorageEngine = new GridFsStorage({
    url: process.env.DATABASE_URL as string,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req: Request, file: CustomFile) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

export default multer({ storage });



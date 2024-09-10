// src/uploadImage.js
import s3Client from "@/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from 'buffer';

export const Uploads3imagesBase64 = async (base64Image: string) => {
    try {
        const base64Data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const datePath = `${year}/${month}/${day}`;
        const key = `images/${datePath}/download.jpg`;

        const params = {
            Bucket: import.meta.env.VITE_BUCKETNAME,
            Key: key,
            Body: base64Data,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'  // Ensure this matches the format of your image
        };

        const command = new PutObjectCommand(params);
        console.log("command++++", command, base64Data);
        
        const data = await s3Client.send(command);
        if (data) {
            const objectUrl = `https://${import.meta.env.VITE_BUCKETNAME}.s3.amazonaws.com/${key}`;
            return {
                status: 200,
                message: "success",
                data: objectUrl,
            };
        } else {
            return {
                status: 500,
                message: "error",
                data: null,
            };
        }
    } catch (error) {
        console.error("Error uploading to S3:", error);
        return {
            status: 500,
            message: "error",
            data: null,
        };
    }
};

// src/s3Client.js
import { S3Client } from "@aws-sdk/client-s3";

console.log("VITE_AWS_REGION++++++", 
    import.meta.env.VITE_AWS_REGION, "--->", 
    import.meta.env.VITE_AWS_ACCESS_KEY_ID, "--->", 
    import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
);

const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

export default s3Client;

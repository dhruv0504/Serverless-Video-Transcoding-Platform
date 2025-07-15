// // For HLS bitrate support 
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { MediaConvertClient, CreateJobCommand } from "@aws-sdk/client-mediaconvert";
// import { SQSClient, DeleteMessageCommand } from "@aws-sdk/client-sqs";
// import type { S3Event, SQSEvent } from 'aws-lambda';

// const s3Client = new S3Client({});
// const mediaConvertClient = new MediaConvertClient({});
// const sqsClient = new SQSClient({});

// export const handler = async (event: SQSEvent) => {
//   for (const record of event.Records) {
//     const s3Event = JSON.parse(record.body) as S3Event;
    
//     // Ignore test events
//     if ("Event" in s3Event && s3Event.Event === "s3:TestEvent") continue;

//     const bucket = s3Event.Records[0].s3.bucket.name;
//     const key = s3Event.Records[0].s3.object.key;

//     try {
//       // Get the object from S3
//       const { Body } = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

//       // Create MediaConvert job
//       const params = {
//         // MediaConvert job parameters for HLS
//       };
//       await mediaConvertClient.send(new CreateJobCommand(params));

//       // Delete the message from the queue
//       await sqsClient.send(new DeleteMessageCommand({
//         QueueUrl: process.env.QUEUE_URL,
//         ReceiptHandle: record.receiptHandle
//       }));

//     } catch (error) {
//       console.error('Error processing message:', error);
//       // Implement your error handling and retry logic here
//     }
//   }
// };

// import ffmpeg from 'fluent-ffmpeg';

// async function transcodeTpHLS(inputFile: string, outputDir: string) {
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputFile)
//       .outputOptions([
//         '-profile:v main',
//         '-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease',
//         '-c:a aac',
//         '-ar 48000',
//         '-b:a 128k',
//         '-c:v h264',
//         '-crf 20',
//         '-g 48',
//         '-keyint_min 48',
//         '-sc_threshold 0',
//         '-b:v 2500k',
//         '-maxrate 2675k',
//         '-bufsize 3750k',
//         '-hls_time 4',
//         '-hls_playlist_type vod',
//         '-hls_segment_filename',
//         `${outputDir}/720p_%03d.ts`
//       ])
//       .output(`${outputDir}/720p.m3u8`)
//       .on('end', resolve)
//       .on('error', reject)
//       .run();
//   });
// }
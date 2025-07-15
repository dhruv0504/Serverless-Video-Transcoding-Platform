import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import type { S3Event } from 'aws-lambda';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const queueUrl = process.env.QUEUE_URL;

if (!accessKeyId || !secretAccessKey || !queueUrl) {
    throw new Error("Missing required environment variables");
}

const client = new SQSClient({
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

async function init() {
    const command = new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
    });

    while(true) {
        const { Messages } = await client.send(command);
        if(!Messages) {
            console.log("No Message in Queue");
            continue;
        }

        // Retry Mechanism - Fault Tolerable
        try {
            for(const Message of Messages) {
                const { MessageId, Body } = Message;
                console.log("Message received:", { MessageId, Body });
    
                // Validate & Parse the Event
    
                if(!Body) continue;
    
                const event = JSON.parse(Body) as S3Event; 

                // Ignore the test events
                if("Service" in event && "Event" in event) {
                    if(event.Event === "s3:TestEvent") continue;
                }
     
                for(const record of event.Records) {
                    const { s3 } = record;
                    const { bucket, object: { key }}  = s3;
                }

                // Spin up the docker container

                

                // Delete the message from queue
            }
        } catch(err) {

        }
    }
}

init();
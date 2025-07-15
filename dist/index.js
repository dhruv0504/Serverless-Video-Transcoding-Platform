"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const queueUrl = process.env.QUEUE_URL;
if (!accessKeyId || !secretAccessKey || !queueUrl) {
    throw new Error("Missing required environment variables");
}
const client = new client_sqs_1.SQSClient({
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new client_sqs_1.ReceiveMessageCommand({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20,
        });
        while (true) {
            const { Messages } = yield client.send(command);
            if (!Messages) {
                console.log("No Message in Queue");
                continue;
            }
            for (const Message of Messages) {
                const { MessageId, Body } = Message;
                console.log("Message received:", { MessageId, Body });
            }
        }
    });
}
init();

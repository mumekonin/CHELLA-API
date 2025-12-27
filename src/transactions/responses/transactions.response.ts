export class TransactionResponse {
    id: string;
    senderFullName: string;
    senderUsername: string;
    receiverFullName: string;
    receiverUsername: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
}
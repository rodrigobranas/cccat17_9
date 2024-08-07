import Transaction from "../../domain/Transaction";

export default interface TransactionRepository {
	saveTransaction (transaction: Transaction): Promise<void>;
	getTransactionById (transactionId: string): Promise<Transaction>;
	getTransactionByRideId (rideId: string): Promise<Transaction>;
}
import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/Transaction";
import ORM from "../orm/ORM";
import TransactionModel from "../orm/TransactionModel";

export default class TransactionRepositoryORM implements TransactionRepository {

	constructor (readonly orm: ORM) {
	}

	async saveTransaction(transaction: Transaction): Promise<void> {
		await this.orm.save(TransactionModel.getModelFromAggreggate(transaction));
	}

	async getTransactionById(transactionId: string): Promise<Transaction> {
		const transactionModel = await this.orm.get("transaction_id", transactionId, TransactionModel);
		return transactionModel.getAggregate();
	}

	async getTransactionByRideId(rideId: string): Promise<Transaction> {
		const transactionModel = await this.orm.get("ride_id", rideId, TransactionModel);
		return transactionModel.getAggregate();
	}

}

import Transaction from "../../../domain/Transaction";
import TransactionRepository from "../../repository/TransactionRepository";

export default class GetTransaction {

	constructor (readonly transactionRepository: TransactionRepository) {
	}

	async execute (transactionId: string): Promise<any> {
		const transaction = await this.transactionRepository.getTransactionById(transactionId);
		return transaction;
	}
}

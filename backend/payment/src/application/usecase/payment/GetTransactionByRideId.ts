import Transaction from "../../../domain/Transaction";
import TransactionRepository from "../../repository/TransactionRepository";

export default class GetTransactionByRideId {

	constructor (readonly transactionRepository: TransactionRepository) {
	}

	async execute (rideId: string): Promise<any> {
		const transaction = await this.transactionRepository.getTransactionByRideId(rideId);
		return transaction;
	}
}

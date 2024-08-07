import Transaction from "../../domain/Transaction";
import { column, model, Model } from "./ORM";

@model("cccat17", "transaction")
export default class TransactionModel extends Model {
	@column("transaction_id", true)
	transactionId: string;
	@column("ride_id")
	rideId: string;
	@column("amount", false, "number")
	amount: number;
	@column("status")
	status: string;
	@column("date")
	date: Date;

	constructor (transactionId: string, rideId: string, amount: number, status: string, date: Date) {
		super();
		this.transactionId = transactionId;
		this.rideId = rideId;
		this.amount = amount;
		this.status = status;
		this.date = date;
	}

	getAggregate () {
		return new Transaction(this.transactionId, this.rideId, this.amount, this.status, this.date);
	}

	static getModelFromAggreggate (transaction: Transaction) {
		return new TransactionModel(transaction.transactionId, transaction.rideId, transaction.amount, transaction.status, transaction.date);
	}
}
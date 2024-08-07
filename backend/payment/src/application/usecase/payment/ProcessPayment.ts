import Transaction from "../../../domain/Transaction";
import { RabbitMQAdapter } from "../../../infra/queue/Queue";
import PaymentGateway from "../../gateway/PaymentGateway";
import TransactionRepository from "../../repository/TransactionRepository";

export default class ProcessPayment {

	constructor (readonly transactionRepository: TransactionRepository, readonly paymentGateway: PaymentGateway, readonly fallbackGateway: PaymentGateway) {
	}

	async execute (input: Input): Promise<Output> {
		console.log("processPayment", input);
		const transaction = Transaction.create(input.rideId, input.amount);
		const inputCreateTransaction = {
			cardHolder: "Cliente Exemplo",
			creditCardNumber: "4012001037141112",
			expDate: "05/2027",
			cvv: "123",
			amount: transaction.amount
		};
		let outputCreateTransaction;
		try {
			outputCreateTransaction = await this.paymentGateway.createTransaction(inputCreateTransaction);
		} catch (e: any) {
			outputCreateTransaction = await this.fallbackGateway.createTransaction(inputCreateTransaction);
		}
		if (outputCreateTransaction.status === "approved") {
			transaction.approve();
		} else {
			transaction.reject();
		}
		await this.transactionRepository.saveTransaction(transaction);
		const queue = new RabbitMQAdapter();
		await queue.connect();
		await queue.setup("paymentApproved", "");
		await queue.publish("paymentApproved", { rideId: input.rideId, status: transaction.status });
		return {
			transactionId: transaction.transactionId
		}
	}
}

type Input = {
	rideId: string,
	amount: number
}

type Output = {
	transactionId: string
}

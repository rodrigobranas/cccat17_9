import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import ORM from "../src/infra/orm/ORM";
import TransactionModel from "../src/infra/orm/TransactionModel";
import crypto from "crypto";

test("Deve testar o ORM", async function () {
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	const transactionId = crypto.randomUUID();
	const rideId = crypto.randomUUID();
	const transactionModel = new TransactionModel(transactionId, rideId, 100, "pending", new Date());
	await orm.save(transactionModel);
	const savedTransaction = await orm.get("transaction_id", transactionId, TransactionModel);
	console.log(savedTransaction);
	await connection.close();
});
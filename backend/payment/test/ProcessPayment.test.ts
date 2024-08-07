import ProcessPayment from "../src/application/usecase/payment/ProcessPayment";
import crypto from "crypto";
import TransactionRepositoryORM from "../src/infra/repository/TransactionRepositoryORM";
import ORM from "../src/infra/orm/ORM";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import GetTransaction from "../src/application/usecase/payment/GetTransaction";
import PJBankGateway from "../src/infra/gateway/PJBankGateway";
import CieloGateway from "../src/infra/gateway/CieloGateway";

test("Deve processar a transação de pagamento", async () => {
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	const transactionRepository = new TransactionRepositoryORM(orm);
	const processPayment = new ProcessPayment(transactionRepository, new PJBankGateway(), new CieloGateway());
	const outputProcessPayment = await processPayment.execute({ rideId: crypto.randomUUID(), amount: 100 });
	const getTransaction = new GetTransaction(transactionRepository);
	const outputGetTransaction = await getTransaction.execute(outputProcessPayment.transactionId);
	expect(outputGetTransaction.transactionId).toBe(outputProcessPayment.transactionId);
	expect(outputGetTransaction.status).toBe("approved");
	expect(outputGetTransaction.amount).toBe(100);
	await connection.close();
});

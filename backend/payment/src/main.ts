import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";
import Registry from "./infra/di/Registry";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";
import ORM from "./infra/orm/ORM";
import TransactionRepositoryORM from "./infra/repository/TransactionRepositoryORM";
import PJBankGateway from "./infra/gateway/PJBankGateway";
import CieloGateway from "./infra/gateway/CieloGateway";
import GetTransaction from "./application/usecase/payment/GetTransaction";
import GetTransactionByRideId from "./application/usecase/payment/GetTransactionByRideId";

(async () => {
	const connection = new PgPromiseAdapter();
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiAdapter();
	const orm = new ORM(connection);
	const transactionRepository = new TransactionRepositoryORM(orm);
	const processPayment = new ProcessPayment(transactionRepository, new PJBankGateway(), new CieloGateway());
	const getTransaction = new GetTransactionByRideId(transactionRepository);
	new PaymentController(httpServer, processPayment, getTransaction);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	await queue.setup("rideCompleted", "rideCompleted.processPayment");
	new QueueController(queue, processPayment);
	httpServer.listen(3002);
})();

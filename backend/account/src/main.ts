import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import GetAccount from "./application/usecase/account/GetAccount";
import Signup from "./application/usecase/account/Signup";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Registry from "./infra/di/Registry";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/controller/QueueController";

(async () => {
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	const signup = new Signup(accountRepository);
	const getAccount = new GetAccount(accountRepository);
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiAdapter();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	await queue.setup("signup", "signup");
	Registry.getInstance().provide("httpServer", httpServer);
	Registry.getInstance().provide("signup", signup);
	Registry.getInstance().provide("getAccount", getAccount);
	Registry.getInstance().provide("queue", queue);
	new AccountController();
	new QueueController();
	httpServer.listen(3001);
})();



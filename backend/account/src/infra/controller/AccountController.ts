import Signup from "../../application/usecase/account/Signup";
import GetAccount from "../../application/usecase/account/GetAccount";
import HttpServer from "../http/HttpServer";
import Registry, { inject } from "../di/Registry";
import Queue from "../queue/Queue";

export default class AccountController {
	@inject("httpServer")
	httpServer!: HttpServer;
	@inject("signup")
	signup!: Signup;
	@inject("getAccount")
	getAccount!: GetAccount;
	@inject("queue")
	queue!: Queue;

	constructor () {
		this.httpServer.register("post", "/signup", async (params: any, body: any) => {
			const input = body;
			const output = await this.signup.execute(input);
			return output;
		});

		this.httpServer.register("post", "/signup_async", async (params: any, body: any) => {
			const input = body;
			await this.queue.publish("signup", input);
		});
		
		this.httpServer?.register("get", "/accounts/:{accountId}", async (params: any, body: any) => {
			const accountId = params.accountId;
			const output = await this.getAccount.execute(accountId);
			return output;
		});
	}
	
}

import Signup from "../../application/usecase/account/Signup";
import { inject } from "../di/Registry";
import Queue from "../queue/Queue";

export default class QueueController {
	@inject("signup")
	signup!: Signup;
	@inject("queue")
	queue!: Queue;

	constructor () {
		this.queue.consume("signup", async (input: any) => {
			await this.signup.execute(input);
		});
	}
}

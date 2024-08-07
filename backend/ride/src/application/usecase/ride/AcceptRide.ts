import { RabbitMQAdapter } from "../../../infra/queue/Queue";
import AccountGateway from "../../gateway/AccountGateway";
import RideRepository from "../../repository/RideRepository";
import UseCase from "../UseCase";

export default class AcceptRide implements UseCase {

	constructor (readonly rideRepository: RideRepository, readonly accountGateway: AccountGateway) {
	}

	async execute(input: Input): Promise<void> {
		const hasActiveRide = await this.rideRepository.hasActiveRideByDriverId(input.driverId);
		if (hasActiveRide) throw new Error("This driver has an active ride");
		const account = await this.accountGateway.getAccountById(input.driverId);
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.accept(account);
		await this.rideRepository.updateRide(ride);
		const queue = new RabbitMQAdapter();
		await queue.connect();
		await queue.setup("rideAccepted", "");
		await queue.publish("rideAccepted", { rideId: ride.rideId, driverName: account.name });
	}

}

type Input = {
	rideId: string,
	driverId: string
}

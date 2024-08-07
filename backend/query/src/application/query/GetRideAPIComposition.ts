import { AxiosAdapter } from "../../infra/http/HttpClient";

export default class GetRideAPIComposition {

	async execute (rideId: string): Promise<any> {
		const httpClient = new AxiosAdapter();
		const ride = await httpClient.get(`http://localhost:3000/rides/${rideId}`);
		const passenger = await httpClient.get(`http://localhost:3001/accounts/${ride.passengerId}`);
		const driver = await httpClient.get(`http://localhost:3001/accounts/${ride.driverId}`);
		const payment = await httpClient.get(`http://localhost:3002/transactions/${ride.rideId}`);
		return {
			ride,
			passenger,
			driver,
			payment
		}
	}

}

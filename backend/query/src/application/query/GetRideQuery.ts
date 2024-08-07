import { PgPromiseAdapter } from "../../infra/database/DatabaseConnection";

export default class GetRideQuery {

	async execute (rideId: string): Promise<any> {
		const connectionRide = new PgPromiseAdapter(5433);
		const connectionAccount = new PgPromiseAdapter(5432);
		const connectionPayment = new PgPromiseAdapter(5434);

		// select r.ride_id, ride.fare, p.name as passenger_name, d.name as driver_name, ... from cccat17.ride r join cccat17.account p on (r.passenger_id = p.account_id) join cccat17.account d on (r.driver_id = p.account_id) left join cccat.17.transaction using (ride_id) where ride_id = 

		const [ride] = await connectionRide.query("select * from cccat17.ride where ride_id = $1", rideId);
		const [passenger] = await connectionAccount.query("select * from cccat17.account where account_id = $1", ride.passenger_id);
		const [driver] = await connectionAccount.query("select * from cccat17.account where account_id = $1", ride.driver_id);
		const [payment] = await connectionPayment.query("select * from cccat17.transaction where ride_id = $1", rideId);

		await connectionRide.close();
		await connectionAccount.close();
		await connectionPayment.close();

		return {
			ride,
			passenger,
			driver,
			payment
		}
	}

}

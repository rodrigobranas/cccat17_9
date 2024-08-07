import { PgPromiseAdapter } from "../../infra/database/DatabaseConnection";

export default class GetRideProjection {

	async execute (rideId: string): Promise<any> {
		const connection = new PgPromiseAdapter(5435);

		// select r.ride_id, ride.fare, p.name as passenger_name, d.name as driver_name, ... from cccat17.ride r join cccat17.account p on (r.passenger_id = p.account_id) join cccat17.account d on (r.driver_id = p.account_id) left join cccat.17.transaction using (ride_id) where ride_id = 

		// MongoDB, RocksDB, Neo4J, CouchDB, Redis, Cassandra, Dynamo
		const [ride] = await connection.query("select * from cccat17.ride_projection where ride_id = $1", rideId);

		await connection.close();

		return ride;
	}

}

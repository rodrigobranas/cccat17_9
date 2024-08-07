import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { RabbitMQAdapter } from "./infra/queue/Queue";

(async () => {
	const queue = new RabbitMQAdapter();
	await queue.connect();
	await queue.setup("rideRequested", "rideRequested.updateProjection");
	await queue.setup("rideAccepted", "rideAccepted.updateProjection");
	await queue.setup("rideCompleted", "rideCompleted.updateProjection");
	await queue.setup("paymentApproved", "paymentApproved.updateProjection");
	const connection = new PgPromiseAdapter(5435);
	queue.consume("rideRequested.updateProjection", async function (input: any) {
		console.log(input.rideId);
		await connection.query("insert into cccat17.ride_projection (ride_id, passenger_name) values ($1, $2)", [input.rideId, input.passengerName]);
	});
	queue.consume("rideAccepted.updateProjection", async function (input: any) {
		await connection.query("update cccat17.ride_projection set driver_name =$1 where ride_id = $2", [input.driverName, input.rideId]);
	});
	queue.consume("rideCompleted.updateProjection", async function (input: any) {
		await connection.query("update cccat17.ride_projection set fare =$1 where ride_id = $2", [input.fare, input.rideId]);
	});
	queue.consume("paymentApproved.updateProjection", async function (input: any) {
		await connection.query("update cccat17.ride_projection set payment_status = $1 where ride_id = $2", [input.status, input.rideId]);
	});
})();

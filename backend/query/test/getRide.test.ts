import GetRideAPIComposition from "../src/application/query/GetRideAPIComposition";
import GetRideProjection from "../src/application/query/GetRideProjection";
import GetRideQuery from "../src/application/query/GetRideQuery";

test("Deve consultar uma ride finalizada por query", async function () {
	const rideId = "5229afe3-1c39-4754-a985-eadcb1e842de";
	const getRideQuery = new GetRideQuery();
	const output = await getRideQuery.execute(rideId);
	console.log(output);
});

test("Deve consultar uma ride finalizada por api", async function () {
	const rideId = "5229afe3-1c39-4754-a985-eadcb1e842de";
	const getRideQuery = new GetRideAPIComposition();
	const output = await getRideQuery.execute(rideId);
	console.log(output);
});

test.only("Deve consultar uma ride finalizada por api", async function () {
	const rideId = "2ccd4c5d-96fd-4438-aed7-5b22a7ffd115";
	const getRideQuery = new GetRideProjection();
	const output = await getRideQuery.execute(rideId);
	console.log(output);
});

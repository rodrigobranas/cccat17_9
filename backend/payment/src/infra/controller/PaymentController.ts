import GetTransactionByRideId from "../../application/usecase/payment/GetTransactionByRideId";
import ProcessPayment from "../../application/usecase/payment/ProcessPayment";
import HttpServer from "../http/HttpServer";

export default class PaymentController {

	constructor (readonly httpServer: HttpServer, readonly processPayment: ProcessPayment, readonly getTransaction: GetTransactionByRideId) {
		httpServer.register("post", "/process_payment", async (params: any, body: any) => {
			const response = await processPayment.execute(body);
			return response;
		});

		httpServer.register("get", "/transactions/:{rideId}", async (params: any, body: any) => {
			const response = await getTransaction.execute(params.rideId);
			return response;
		});
	}
}

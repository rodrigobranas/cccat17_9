export default interface PaymentGateway {
	createTransaction (input: any): Promise<Output>;
}

type Output = {
	tid: string,
	authorizationCode: string,
	status: string
}

import PaymentGateway from "../../application/gateway/PaymentGateway";
import axios from "axios";

export default class CieloGateway implements PaymentGateway {

	async createTransaction(input: any): Promise<any> {
		console.log("processing cielo");
		let transaction = {  
			"MerchantOrderId":"2014111701",
			 "Customer":{  
			   "Name":"Comprador Teste",
			   "Identity":"11225468954",
			   "IdentityType":"CPF",
			   "Email":"compradorteste@teste.com",
			   "Birthdate":"1991-01-02",
			   "Address":{  
				  "Street":"Rua Teste",
				  "Number":"123",
				  "Complement":"AP 123",
				  "ZipCode":"12345987",
				  "City":"Rio de Janeiro",
				  "State":"RJ",
				  "Country":"BRA"
			   },
				 "DeliveryAddress": {
					 "Street": "Rua Teste",
					 "Number": "123",
					 "Complement": "AP 123",
					 "ZipCode": "12345987",
					 "City": "Rio de Janeiro",
					 "State": "RJ",
					 "Country": "BRA"
				 }
			},
			"Payment":{  
			  "Type":"CreditCard",
			  "Amount":15700,
			  "Currency":"BRL",
			  "Country":"BRA",
			  "Provider":"Simulado",
			  "ServiceTaxAmount":0,
			  "Installments":1,
			  "Interest":"ByMerchant",
			  "Capture":false,
			  "Authenticate":false,    
			  "Recurrent": false,
			  "SoftDescriptor":"123456789ABCD",
			  "CreditCard":{  
				  "CardNumber":"4024007197692931",
				  "Holder":"Teste Holder",
				  "ExpirationDate":"12/2021",
				  "SecurityCode":"123",
				  "SaveCard":"false",
				  "Brand":"Visa"
			  }
			}
		 }
		
		const request = {
			url: `https://apisandbox.cieloecommerce.cielo.com.br/1/sales/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				MerchantId: "10631719-a8b9-44fa-8053-1d856ca3cac7",
				MerchantKey: "TWFYUFSEXRRPQGCUQLHFHGEXWEDNOPQTXGUFDSQH"
			},
			data: transaction
		}
		
		const output = (await axios(request)).data;
		let status = "rejected";
		if (output.Payment.ReturnCode === "4") {
			status = "approved";
		}
		return {
			tid: output.Payment.Tid,
			authorizationCode: output.Payment.AuthorizationCode,
			status
		}
	}

}
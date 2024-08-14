import { mount } from "@vue/test-utils";
import App from "../src/App.vue";
import { AxiosAdapter, FetchAdapter } from "../src/infra/http/HttpClient";
import { AccountGatewayFake, AccountGatewayHttp } from "../src/infra/gateway/AccountGateway";

let wrapper: any;

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

beforeEach(() => {
	const httpClient = new AxiosAdapter();
	// const httpClient = new FetchAdapter();
	const accountGateway = new AccountGatewayHttp(httpClient); 
	// const accountGateway = new AccountGatewayFake();
	wrapper = mount(App, {
		global: {
			provide: {
				accountGateway
			}
		}
	});
})

test("Deve criar uma conta de passageiro", async function () {
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	expect(wrapper.get(".progress").text()).toBe("0%");
	expect(wrapper.find(".button-back").exists()).toBe(false);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirmPassword").exists()).toBe(false);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Selecione o tipo de conta");
	await wrapper.get(".input-is-passenger").setValue(true);
	expect(wrapper.get(".progress").text()).toBe("30%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".button-back").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	expect(wrapper.get(".error-message").text()).toBe("");
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirmPassword").exists()).toBe(false);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Digite o nome");
	await wrapper.get(".input-name").setValue("John Doe");
	expect(wrapper.get(".progress").text()).toBe("45%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Digite o email");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	expect(wrapper.get(".progress").text()).toBe("60%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Digite o cpf");
	await wrapper.get(".input-cpf").setValue("97456321558");
	expect(wrapper.get(".progress").text()).toBe("75%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	await wrapper.get(".button-back").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	expect(wrapper.get(".error-message").text()).toBe("");
	expect(wrapper.find(".button-next").exists()).toBe(false);
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Digite a senha");
	await wrapper.get(".input-password").setValue("123456");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("Digite a confirmação da senha");
	await wrapper.get(".input-confirm-password").setValue("123");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".error-message").text()).toBe("A senha e a confirmação da senha devem ser iguais");
	await wrapper.get(".input-confirm-password").setValue("123456");
	expect(wrapper.get(".progress").text()).toBe("100%");
	await wrapper.get(".button-confirm").trigger("click");
	await sleep(200);
	expect(wrapper.get(".success-message").text()).toBe("Conta criada com sucesso!");
	expect(wrapper.get(".account-id").text()).toBeDefined();
});

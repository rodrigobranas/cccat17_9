<script setup lang="ts">
	import { inject, ref } from "vue";
	import SignupWizard from "./domain/SignupWizard";
	import AccountGateway from "./infra/gateway/AccountGateway";

	const wizard = ref(new SignupWizard());
	const accountGateway: AccountGateway = inject("accountGateway")!;

	wizard.value.register("signupConfirmed", async function (event: any) {
		const output = await accountGateway.signup(event);
		wizard.value.successMessage = "Conta criada com sucesso!";
		wizard.value.accountId = output.accountId;
	});
	
</script>

<template>
	<div v-if="!wizard.successMessage">
		<div class="step" @click="wizard.populate()">Passo {{ wizard.step }}</div>
		<div class="progress">{{ wizard.calculateProgress() }}%</div>
		<div class="error-message">{{ wizard.errorMessage }}</div>
		<div v-if="wizard.step === 1">
			<input class="input-is-passenger" type="checkbox" v-model="wizard.isPassenger"/> Passageiro
		</div>
		<div v-if="wizard.step === 2">
			<div>
				<label>Name</label>
				<input class="input-name" type="text" v-model="wizard.name"/>
			</div>
			<div>
				<label>Email</label>
				<input class="input-email" type="text" v-model="wizard.email"/>
			</div>
			<div>
				<label>Cpf</label>
				<input class="input-cpf" type="text" v-model="wizard.cpf"/>
			</div>
		</div>
		<div v-if="wizard.step === 3">
			<div>
				<label>Senha</label>
				<input class="input-password" type="password" v-model="wizard.password"/>
			</div>
			<div>
				<label>Confirmação da senha</label>
				<input class="input-confirm-password" type="password" v-model="wizard.confirmPassword"/>
			</div>
		</div>
		<button v-if="wizard.step > 1" class="button-back" @click="wizard.back()">Anterior</button>
		<button v-if="wizard.step < 3" class="button-next" @click="wizard.next()">Próximo</button>
		<button v-if="wizard.step === 3" class="button-confirm" @click="wizard.confirm()">Confirmar</button>
	</div>
	<div v-if="wizard.successMessage">
		<span class="success-message">{{ wizard.successMessage }}</span>
		<br/>
		<span class="account-id">{{ wizard.accountId }}</span>
	</div>
</template>

<style>
</style>

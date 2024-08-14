import SignupWizard from "../src/domain/SignupWizard"

test("Deve criar uma conta de passageiro", function () {
	const wizard = new SignupWizard();
	expect(wizard.step).toBe(1);
	expect(wizard.calculateProgress()).toBe(0);
	wizard.next();
	expect(wizard.errorMessage).toBe("Selecione o tipo de conta");
	wizard.isPassenger = true;
	wizard.next();
	expect(wizard.errorMessage).toBe("");
	expect(wizard.step).toBe(2);
})
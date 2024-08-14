import { useState } from "react";
import SignupWizard from "./SignupWizard"

function App() {
	const [wizard, setWizard] = useState(new SignupWizard());
	
	function reload (fn: any) {
		if (fn) fn();
		setWizard(clone(wizard));
	}

	return (
		<div>
			{ !wizard.successMessage && <div>
				<div>Passo { wizard.step }</div>
				<br/>
				<div>Progresso { wizard.calculateProgress() }%</div>
				<br/>
				<div>{ wizard.errorMessage }</div>
				<br/>
				{ (wizard.step === 1) && 
					<div>
						<input type="checkbox" onChange={() => reload(() => wizard.isPassenger = !wizard.isPassenger)}/> Passageiro
					</div>
				}
				{ (wizard.step === 2) && 
					<div>
						<div>
							<label>Name</label>
							<input type="text" value={wizard.name} onChange={(e) => reload(() => wizard.name = e.target.value )}/>
						</div>
						<div>
							<label>Email</label>
							<input type="text" value={wizard.email} onChange={(e) => reload(() => wizard.email = e.target.value )}/>
						</div>
						<div>
							<label>Cpf</label>
							<input type="text" value={wizard.cpf} onChange={(e) => reload(() => wizard.cpf = e.target.value )}/>
						</div>
					</div>
				}
				{ (wizard.step === 3) &&
					<div>
						<div>
							<label>Senha</label>
							<input type="password" value={wizard.password} onChange={(e) => reload(() => wizard.password = e.target.value )}/>
						</div>
						<div>
							<label>Confirmação de senha</label>
							<input type="password" value={wizard.confirmPassword} onChange={(e) => reload(() => wizard.confirmPassword = e.target.value )}/>
						</div>
					</div>
				}
				{ wizard.step !== 1 && <button onClick={() => reload(() => wizard.back()) }>Anterior</button> }
				{ wizard.step !== 3 && <button onClick={() => reload(() => wizard.next()) }>Próximo</button> }
				{ wizard.step === 3 && <button onClick={() => reload(() => wizard.confirm()) }>Confirmar</button> }
			</div> }
			{ wizard.successMessage && <div>
				<div>
					{ wizard.successMessage }
				</div>
			</div> }
		</div>
	)
}

function clone(obj: any) {
    var copy = new obj.constructor;
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export default App

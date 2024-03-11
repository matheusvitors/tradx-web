import { Button, Checkbox, DatePicker, Form, RadioButton, RadioGroup, TextInput, Textarea } from "@/ui/components";
import { ModalPage } from "@/ui/layouts";
import React, { FormEvent, useEffect, useRef, useState } from "react";

export const PersistOperacoesPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const contaSelectInputRef = useRef<HTMLInputElement>(null);
	const ativoSelectInputRef = useRef<HTMLInputElement>(null);
	const dataEntradaInputRef = useRef<HTMLInputElement>(null);
	const quantidadeInputRef = useRef<HTMLInputElement>(null);
	const compraRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const vendaRadioButtonInputRef = useRef<HTMLInputElement>(null);
	const precoEntradaInputRef = useRef<HTMLInputElement>(null);
	const stopLossInputRef = useRef<HTMLInputElement>(null);
	const alvoInputRef = useRef<HTMLInputElement>(null);
	const precoSaidaInputRef = useRef<HTMLInputElement>(null);
	const dataSaidaInputRef = useRef<HTMLInputElement>(null);
	const operacaoPerdidaCheckboxInputRef = useRef<HTMLInputElement>(null);
	const operacaoErradaCheckboxInputRef = useRef<HTMLInputElement>(null);
	const comentariosTextareaRef = useRef<HTMLTextAreaElement>(null);

	let tipoInputValue = "compra";

	useEffect(() => {
		if(compraRadioButtonInputRef.current) {
			compraRadioButtonInputRef.current.checked = true;
		}
	}, [])



	const onChangeTipoInput = () => {
		if(compraRadioButtonInputRef.current && compraRadioButtonInputRef.current.checked) {
			tipoInputValue = 'compra';
		}

		if(vendaRadioButtonInputRef.current && vendaRadioButtonInputRef.current.checked) {
			tipoInputValue = 'venda';
		}

	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if(
			operacaoErradaCheckboxInputRef.current &&
			operacaoPerdidaCheckboxInputRef.current
		) {
			console.log(operacaoErradaCheckboxInputRef.current.checked, operacaoPerdidaCheckboxInputRef.current.checked);

		}
		console.log("onsubmit");
	};

	return (
		<ModalPage title="Adicionar Operação">
			<Form onSubmit={onSubmit}>
				<TextInput label="Conta" reference={contaSelectInputRef} />
				<TextInput label="Ativo" reference={ativoSelectInputRef} />
				<TextInput label="Quantidade" reference={quantidadeInputRef} />
				<RadioGroup>
					<RadioButton name="tipo" value="compra" label="Compra" onChange={onChangeTipoInput} reference={compraRadioButtonInputRef} />
					<RadioButton name="tipo" value="venda" label="Venda" onChange={onChangeTipoInput} reference={vendaRadioButtonInputRef} />
				</RadioGroup>
				<TextInput label="Entrada" reference={precoEntradaInputRef} />
				<TextInput label="Stop Loss" reference={stopLossInputRef} />
				<TextInput label="Alvo" reference={alvoInputRef} />
				<TextInput label="Saída" reference={precoSaidaInputRef} />
				<DatePicker label="Data de Entrada" reference={dataEntradaInputRef} />
				<DatePicker label="Data de Saída" reference={dataSaidaInputRef} />

				<RadioGroup>
					<Checkbox label="Operação errada?" name='errada' backgroundColor="#CC1919" reference={operacaoErradaCheckboxInputRef} />
					<Checkbox label="Operação perdida?" name="perdida" backgroundColor="#7A7A7A" reference={operacaoPerdidaCheckboxInputRef} />
				</RadioGroup>

				<Textarea label="Comentários" name='comentarios' reference={comentariosTextareaRef} />

				<Button label="Salvar" type="submit" isLoading={isLoading} />
			</Form>
		</ModalPage>
	);
};


import { DatePicker, Form, TextInput } from '@/ui/components';
import { ModalPage } from '@/ui/layouts';
import React, { FormEvent, useRef } from 'react';

export const PersistOperacoesPage: React.FC = () => {


	const ativoSelectInputRef = useRef<HTMLInputElement>(null);
	const contaSelectInputRef = useRef<HTMLInputElement>(null);
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
	const motivoInputRef = useRef<HTMLInputElement>(null);
	const comentariosInputRef = useRef<HTMLInputElement>(null);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		console.log('onsubmit');
	}

	return (
		<ModalPage title='Adicionar Operação'>
			<Form onSubmit={onSubmit}>
				<DatePicker label='Data de Entrada' reference={dataEntradaInputRef}/>
				<TextInput label="Nome" reference={quantidadeInputRef} />
			</Form>
		</ModalPage>
	);
}

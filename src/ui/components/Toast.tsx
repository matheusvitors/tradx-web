import { Confirm, IConfirmOptions, INotifyOptions, Notify } from "notiflix";

const confirmOptions: IConfirmOptions = {
	backgroundColor: '#75FA7C',
	titleColor: '#FF5C0A',
	messageColor: '#141414',
	okButtonBackground: '#FF5C0A'
}

const notifyOptions: INotifyOptions = {
	position: 'right-bottom'
}

export const Toast = {
	success: (text: string) => {
		Notify.success(text, notifyOptions);
	},

	info: (text: string) => {
		Notify.info(text, notifyOptions);
	},

	error: (text: string) => {
		Notify.failure(text, notifyOptions);
	},

	confirm: (title: string, text: string, confirmLabel: string, confirmCallback: () => void) => {
		Confirm.show(
			title,
			text,
			confirmLabel,
			'Cancelar',
			confirmCallback,
			() => {},
			confirmOptions
		);
	}

	// ask: () => {
	// 	Confirm.ask(
	// 		'titulo',
	// 		'texto',
	// 		'label positivo',
	// 		'label negativo',
	// 		'nao sei',
	// 		() => alert('positivo'),
	// 		() => alert('negativo')
	// 	);
	// }
}

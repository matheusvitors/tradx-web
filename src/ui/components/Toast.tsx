import { Confirm, IConfirmOptions, INotifyOptions, Notify } from "notiflix";

const confirmOptions: IConfirmOptions = {
	backgroundColor: '#141414',
	titleColor: '#7f32fb',
	messageColor: '#fefefe',
	okButtonBackground: '#7f32fb',
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
	},

	// ask: (title: string, text: string, positiveLabel: string, negativeLabel: string, positiveCallback: () => void, negativeCallback: () => void) => {
	// 	Confirm.ask(
	// 		title,
	// 		text,
	// 		positiveLabel,
	// 		negativeLabel,
	// 		'nao sei',
	// 		positiveCallback,
	// 		negativeCallback
	// 	);
	// }
}

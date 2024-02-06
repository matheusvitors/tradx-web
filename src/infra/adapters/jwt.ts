import { DecodedJwtPayload } from "@/application/interfaces";
import { jwtDecode } from "jwt-decode";

export const jwt = {
	decode: (token: string) => {
		if(token) {
			return jwtDecode<DecodedJwtPayload>(token || '');
		} else {
			throw new Error('Não há token.');
		}
	},

	isExpired: (token: string): boolean => {
		if(token) {
			const decodedToken: DecodedJwtPayload = jwt.decode(token);

			if(decodedToken.exp) {
				if(Math.floor(new Date().getTime()) > (decodedToken.exp * 1000)) {
					return true;
				}

				return false;
			}
		}

		return true;
	}
}

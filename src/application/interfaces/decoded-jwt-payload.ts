import { JwtPayload } from "jwt-decode";

export interface DecodedJwtPayload extends JwtPayload {
	name: string;
	system: string;
}

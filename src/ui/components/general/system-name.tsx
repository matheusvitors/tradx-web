import React from "react";

interface SystemNameProps {
	color: string;
	width: string;
	height: string;
}

export const SystemName: React.FC<SystemNameProps> = ({ color, width, height }) => {
	return (
		<svg width={width} height={height} viewBox="0 0 1344 224" fill={color} xmlns="http://www.w3.org/2000/svg">
			<path
				d="M.137 18.76V0h224v18.76h-102.48V224h-19.04V18.76H.137zm504 42c0 10.64-2.614 20.533-7.84 29.68-5.04 8.96-11.854 16.147-20.44 21.56 8.586 5.413 15.4 12.693 20.44 21.84 5.226 8.96 7.84 18.76 7.84 29.4V224h-18.76v-60.76c0-11.573-4.107-21.373-12.32-29.4-8.214-8.213-18.107-12.32-29.68-12.32h-144.48V224h-18.76V0h163.24c16.8 0 31.08 5.973 42.84 17.92 11.946 11.76 17.92 26.04 17.92 42.84zm-205.24-42v83.72h144.48c11.573 0 21.466-4.013 29.68-12.04 8.213-8.213 12.32-18.107 12.32-29.68s-4.107-21.467-12.32-29.68c-8.214-8.213-18.107-12.32-29.68-12.32h-144.48zM560.137 224l126-224 125.72 224h-22.96L686.137 40.6 583.097 224h-22.96zM979.754 0c30.986 0 57.396 10.92 79.236 32.76 21.84 21.84 32.76 48.253 32.76 79.24 0 30.987-10.92 57.4-32.76 79.24-21.84 21.84-48.25 32.76-79.236 32.76h-112V102.48h18.76v102.76h93.24c16.8 0 32.386-4.107 46.756-12.32 14.38-8.4 25.67-19.787 33.88-34.16 8.4-14.373 12.6-29.96 12.6-46.76 0-16.8-4.2-32.387-12.6-46.76-8.21-14.373-19.5-25.667-33.88-33.88-14.37-8.4-29.956-12.6-46.756-12.6h-112V0h112zm337.506 0h26.6l-98.84 112 98.84 112h-26.6l-85.4-96.88-85.4 96.88h-26.6l98.84-112-98.84-112h26.6l85.4 96.88L1317.26 0z"
				fill="current"
			/>
		</svg>
	);
};
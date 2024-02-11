import React from "react";
import { Outlet, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AtivosPage, ContasPage, HomePage, LoginPage, NovaContaPage, OperacoesPage } from "@/ui/pages";
import { KEY_TOKEN } from "@/infra/config/storage-keys";

export const Router: React.FC = () => {
	const location = useLocation();
	const background = location.state && location.state.background;

	const ProtectedRoutes: React.FC = () => {
		return localStorage.getItem(KEY_TOKEN) ? <Outlet /> : <Navigate to="login" />;
	};

	return (
		<>
			<Routes location={background || location}>
				<Route path="/login" element={<LoginPage />} />

				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/" element={<Navigate replace to="home" />} />
					<Route path="home" element={<HomePage />} />
					<Route path="operacoes" element={<OperacoesPage />} />
					<Route path="ativos" element={<AtivosPage />} />
					<Route path="contas" element={<ContasPage />} />
				</Route>
			</Routes>

			{background && (
				<Routes>
					<Route path="teste" element={<NovaContaPage />} />
				</Routes>
			)}
		</>
	);
};

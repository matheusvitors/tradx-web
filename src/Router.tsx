import React from "react";
import { Outlet, Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { AtivosPage, ContasPage, HomePage, LoginPage, OperacoesPage } from "@/ui/pages";
import { KEY_TOKEN } from "@/infra/config/storage-keys";

export const Router: React.FC = () => {
	const ProtectedRoutes: React.FC = () => {
		return localStorage.getItem(KEY_TOKEN) ? <Outlet /> : <Navigate to='login' />
		// return <Outlet />
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route path='/' element={<ProtectedRoutes />}>
					<Route path="/" element={<Navigate replace to="home" />} />
					<Route path="home" element={<HomePage />} />
					<Route path="operacoes" element={<OperacoesPage />} />
					<Route path="ativos" element={<AtivosPage />} />
					<Route path="contas" element={<ContasPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

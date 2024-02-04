import React from "react";
import { Outlet, Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage, LoginPage } from "@/ui/pages";
import { KEY_TOKEN } from "@/infra/config/storage-keys";

export const Router: React.FC = () => {
	const ProtectedRoutes: React.FC = () => {
		return localStorage.getItem(KEY_TOKEN) ? <Outlet /> : <Navigate to='login' />
		// return <Outlet />
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />

				<Route path='/' element={<ProtectedRoutes />}>
					<Route path="/" element={<Navigate replace to="home" />} />
					<Route path="home" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

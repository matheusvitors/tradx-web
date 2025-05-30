import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { isTokenExpired } from "@/application/services";
import { Header, Sidebar } from "@/ui/layouts";
import { usePersistentState } from "@/ui/hooks";

interface PageProps {
	children: ReactNode;
	withGrow?: boolean;
	pageName: string;
}

export const Page: React.FC<PageProps> = ({ children, withGrow, pageName }) => {
	const navigate = useNavigate();

	const [isOpenSidebar, setIsOpenSidebar] = usePersistentState<boolean>("@tradx:isOpenSidebar", true);

	useEffect(() => {
		if (isTokenExpired()) {
			navigate("/login");
		}

		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsOpenSidebar(false);
			} else {
				setIsOpenSidebar(true);
			}
		};

		handleResize(); // Executa já ao carregar

		window.addEventListener("resize", handleResize); // Escuta mudanças

		return () => {
			window.removeEventListener("resize", handleResize); // Limpa
		};
	}, []);

	return (
		<Container>
			<Sidebar open={isOpenSidebar} setOpen={setIsOpenSidebar} />
			<Content open={isOpenSidebar}>
				<Header pageName={pageName} open={isOpenSidebar} setOpen={setIsOpenSidebar} />
				<ChildrenContainer withGrow={withGrow}>{children}</ChildrenContainer>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	min-width: 100%;
	min-height: 100vh;

	transition: all 0.3s;
`;

const Content = styled.div<{ open: boolean }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;

	transition: width 0.5s ease;

	width: ${({ open }) => (open ? css`calc(100% - 250px)` : "100%")};
	min-height: 100vh;
`;

const ChildrenContainer = styled.div<{ withGrow?: boolean }>`
	display: flex;
	flex-grow: 1;

	width: 100%;
	padding: 20px;
`;

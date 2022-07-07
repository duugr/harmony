import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './services/AuthContext';
import Router from './services/routes.Services';

export default function App() {
	return <AuthProvider>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</AuthProvider>;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
	let value = useContext(AuthContext)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

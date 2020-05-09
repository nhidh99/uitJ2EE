import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './scenes/Home';
import Auth from './scenes/Auth';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact component={Home} path="/(|detail|result|user)"/>
				<Route exact component={Auth} path="/auth/(forgot|login|register)"/>        
			</Switch>
		</BrowserRouter>
	);
}

export default App;

// http:localhost:3000/
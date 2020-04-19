import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './scenes/Home';
import Auth from './scenes/Auth';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					{/* <Route exact component={Home} path="/(|detail|result)"/>
					<Route exact component={Home} path="/user/(info|password|address)"/>
					<Route exact component={Auth} path="/auth/(forgot|login|register)"/>    */}
					<Route exact component={Home} path="/(|detail|result)"/>
					<Route exact component={Home} path="/user/(info|password|address|save-for-later)"/>
					<Route exact component={Home} path="/user/address/(|create)"/>
					<Route exact component={Auth} path="/auth/(forgot|login|register)"/>       
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

// http:localhost:3000/
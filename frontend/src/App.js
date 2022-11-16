import MapContainer from './components/Map/MapContainer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getCurrentUser } from './store/session';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import SplashPage from './components/SplashPage/SplashPage';
import MainPage from './components/MainPage/MainPage';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser()).then(() => setLoaded(true));
	}, [dispatch]);

	return (
		loaded && (
			<>
				<Switch>
					<AuthRoute exact path='/' component={SplashPage} />
		
					<Route path='/map-test' component={MapContainer} />
					<ProtectedRoute exact path='/main' component={MainPage} />
				</Switch>
			</>
		)
	);
}

export default App;

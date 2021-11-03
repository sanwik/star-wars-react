import './App.css';
import Login from './Components/Login.js';
import Catalog from './Components/Catalog.js';
import { Route, Redirect, Switch } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createMemoryHistory } from "history";

function App() {
  const history = createMemoryHistory();
  return (
    <div className="App">
        <Switch history={history}>
          <Route exact path="/">
            <Redirect to="/login" />    
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/catalog" component={Catalog} /> 
        </Switch>
    </div>
  );
}

export default App;

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import ButtonAppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ButtonAppBar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

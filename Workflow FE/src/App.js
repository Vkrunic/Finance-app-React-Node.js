import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Calculations } from "./pages/calculations.jsx";
import { Landing } from "./pages/landing.jsx"
import { Projects } from "./pages/projects.jsx";
import { RunningCost } from "./pages/runningCost.jsx";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/inputdata">
            <Projects />
          </Route>
          <Route exact path="/clientsdata">
            <Calculations />
          </Route>
          <Route exact path="/runningcosts">
            <RunningCost />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

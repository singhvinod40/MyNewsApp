import './App.css';
import Navbar from './component/Navbar/Navbar';
import News from "./component/NewComponent/News"
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {

  const [progress,setProgress] = useState(0);
  const country = 'in';
  const pageSize = 12;
  const ApiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Router>
        <Navbar />

        <LoadingBar color='#f11946' height={4} progress={progress} />

        <Switch>
          <Route exact path="/"><News setProgress={setProgress} key="general" pageSize={pageSize} ApiKey={ApiKey} country={country} category="general" /></Route>
          <Route exact path="/business"><News setProgress={setProgress} key="business" pageSize={pageSize} ApiKey={ApiKey} country={country} category="business" /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" pageSize={pageSize} ApiKey={ApiKey} country={country} category="entertainment" /></Route>
          <Route exact path="/health"><News setProgress={setProgress} key="health" pageSize={pageSize} ApiKey={ApiKey} country={country} category="health" /></Route>
          <Route exact path="/science"><News setProgress={setProgress} key="science" pageSize={pageSize} ApiKey={ApiKey} country={country} category="science" /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} key="sports" pageSize={pageSize} ApiKey={ApiKey} country={country} category="sports" /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} key="technology" pageSize={pageSize} ApiKey={ApiKey} country={country} category="technology" /></Route>
        </Switch>
      </Router>
    </div>
  )

}
export default App;
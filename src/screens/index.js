import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AnimatedSwitch} from 'react-router-transition';

import Home from "./Home";
import Statistic from "./Statistics";

class App extends React.Component {
  render() {
    return (
      <Router>
        {(window.screen.width <= 420 &&
        (<AnimatedSwitch
          atEnter={{marginTop: -10}}
          atLeave={{}}
          atActive={{marginTop: 0}}
        >
          <Route path={'/stats'} render={(props) => <Statistic {...props} />}/>
          <Route path={'/'} render={(props) => <Home {...props} />}/>
        </AnimatedSwitch>)) || 'This application only support mobile T.T'}
      </Router>
    )
  }
}

export default App;

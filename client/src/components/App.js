import React from "react";
import PfcTile from "./pfcTile";

import "../style/App.css";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissor from "../images/scissor.svg";

class App extends React.Component {
  render() {
    return (
      <div className="pfc-app">
        <div className="status">
          <h1>Waiting for a player ...</h1>
        </div>
        <div className="choice">
          <h3>Your Choice:</h3>
          {/* choice */}
          <h3>Opponent's Choice:</h3>
          {/* opponent's choice */}
        </div>
        <div className="tile-wrapper">
          <PfcTile src={rock} name="rock" />
          <PfcTile src={paper} name="paper" />
          <PfcTile src={scissor} name="Scissor" />
        </div>
      </div>
    );
  }
}

export default App;

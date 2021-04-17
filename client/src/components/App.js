import React from "react";
import PfcTile from "./pfcTile";
import io from "socket.io-client";
import "../style/App.css";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissor from "../images/scissor.svg";
const socket = io("http://localhost:4200");
// socket.emit("greatings", { name: "Mehdi" });
socket.emit("join");
socket.on("join_success", () => {
  console.log("Join success");
});
socket.on("wait", ()=> {
  console.log("waiting");
});
class App extends React.Component {
  constructor(props){
    super(props);
    this.status = "Waiting for a play room ...";
  }
  handleClick(ch) {
    console.log(ch);
    socket.emit("choice", {choice: ch});
  }
  render() {
    return (
      <div className="pfc-app">
        <div className="status">
          <h1>{this.status}</h1>
        </div>
        <div className="choice">
          <h3>Your Choice:</h3>
          {/* choice */}
          <h3>Opponent's Choice:</h3>
          {/* opponent's choice */}
        </div>
        <div className="tile-wrapper">
          <PfcTile
            src={rock}
            name="rock"
            handleClick={(c) => this.handleClick(c)}
          />
          <PfcTile
            src={paper}
            name="paper"
            handleClick={(c) => this.handleClick(c)}
          />
          <PfcTile
            src={scissor}
            name="scissor"
            handleClick={(c) => this.handleClick(c)}
          />
        </div>
      </div>
    );
  }
}

export default App;

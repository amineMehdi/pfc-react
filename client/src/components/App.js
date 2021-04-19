import React from "react";
import PfcTile from "./pfcTile";
import io from "socket.io-client";
import "../style/App.css";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissor from "../images/scissor.svg";
const socket = io("http://localhost:4200");
// let waitInterval;
// const socketListen = () => {
//     socket.emit("join");
//     socket.on("join_success", () => {
//       console.log("Join success");
//     });
//     socket.on("wait", ()=> {
//       console.log("waiting");
//     });
//     socket.on("lose", () => {
//       console.log("lost");
//     });
//     socket.on("win", () => {
//       console.log("won");
//     });
//     socket.on("draw", () => {
//       console.log("draw");
//     });
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "",
      roomStatus: "",
    };
    socket.emit("join");
  }
  socketListen() {
    socket.on("join_success", () => {
      this.setState({
        roomStatus: "Ready to play.",
      });
      // if (waitInterval) document.clearInterval(waitInterval);
      console.log("Join success");
    });
    socket.on("wait_player", () => {
      this.setState({
        roomStatus: "Waiting for another Player ",
      });
    });
    socket.on("wait", () => {
      this.setState({
        roomStatus: "Waiting for a play room ...",
      });
      // socket.emit("join");
      console.log("waiting");
    });
    socket.on("lose", () => {
      console.log("lost");
    });
    socket.on("win", () => {
      console.log("won");
    });
    socket.on("draw", () => {
      console.log("draw");
    });
  }
  handleClick(ch) {
    this.setState({
      choice: ch,
    });
    socket.emit("choice", { choice: ch });
  }

  render() {
    this.socketListen();
    return (
      <div className="pfc-app">
        <div className="status">
          <h1>{this.state.roomStatus}</h1>
        </div>
        <div className="choice">
          <h3>Your Choice: {this.state.choice}</h3>

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

import React from "react";
import PfcTile from "./pfcTile";
import io from "socket.io-client";
import "../style/App.css";
import paper from "../images/paper.svg";
import rock from "../images/rock.svg";
import scissor from "../images/scissor.svg";
const socket = io("http://localhost:4200");
let timer;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "",
      opponentChoice: "",
      roomStatus: "",
      roomReady: false
    };
    socket.emit("join");
  }

  handleClick(ch) {
    if (this.state.opponentChoice) this.setState({ opponentChoice: "" });
    if (this.state.roomReady && this.state.roomStatus) this.setState({ roomStatus: "" });
    this.setState({
      choice: this.state.roomReady ? ch : "",
    });
    socket.emit("choice", { choice: ch });
  }
  componentDidMount() {
    socket.on("room_ready", () => {
      if (timer) clearInterval(timer);
      this.setState({
        roomStatus: "Ready to play.",
        roomReady: true
      });
      // console.log("Join success");
    });
    socket.on("wait_player", () => {
      this.setState({
        roomStatus: "Waiting for another Player ",
        roomReady: false
      });
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        socket.emit("join");
      }, 1000);
    });
    socket.on("wait", () => {
      this.setState({
        roomStatus: "Waiting for a play room ...",
        roomReady: false
      });
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        socket.emit("join");
      }, 1000);

    });
    socket.on("lose", (args) => {
      this.setState({
        opponentChoice: args.opponentChoice,
        roomStatus: "You Lost \u{1F625}",
      });
    });
    socket.on("win", (args) => {
      this.setState({
        opponentChoice: args.opponentChoice,
        roomStatus: "You Won \u{1F642}",
      });
    });
    socket.on("draw", (args) => {
      this.setState({
        opponentChoice: args.opponentChoice,
        roomStatus: "Draw \u{1F610}",
      });
    });
  }

  firstLetterCap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    return (
      <div className="pfc-app">
        <div className="status">
          <h1>{this.state.roomStatus}</h1>
        </div>
        <div className="choice">
          <h3>Your Choice: {this.firstLetterCap(this.state.choice)}</h3>

          <h3>
            Opponent's Choice: {this.firstLetterCap(this.state.opponentChoice)}
          </h3>
        </div>
        {/* <div id="l">
          <svg src={scissor}></svg>
        </div> */}
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

import React from "react";
import PfcTile from "./pfcTile";
import io from "socket.io-client";
import "../style/App.css";
const socket = io("http://localhost:4200");
let timer;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.initStroke = {
      rock: "#000",
      paper: "#000",
      scissor: "#000",
    };
    this.state = {
      choice: "",
      opponentChoice: "",
      roomStatus: "",
      roomReady: false,
      strokeSelect: {
        ...this.initStroke,
      },
    };
    socket.emit("join");
  }

  handleClick(ch) {
    if (this.state.opponentChoice) this.setState({ opponentChoice: "" });
    if (this.state.roomReady && this.state.roomStatus)
      this.setState({ roomStatus: "" });
    // console.log(this.state.strokeSelect);
    this.setState({
      choice: this.state.roomReady ? ch : "",
      strokeSelect: {
        ...this.initStroke,
        [ch]: "#ff9100",
      },
    });
    this.setState((prevState) => {});
    socket.emit("choice", { choice: ch });
  }

  componentDidMount() {
    socket.on("room_ready", () => {
      if (timer) clearInterval(timer);
      this.setState({
        roomStatus: "Ready to play.",
        roomReady: true,
      });
    });
    socket.on("wait_player", () => {
      this.setState({
        roomStatus: "Waiting for another Player ",
        roomReady: false,
      });
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        socket.emit("join");
      }, 1000);
    });
    socket.on("wait", () => {
      this.setState({
        roomStatus: "Waiting for a play room ...",
        roomReady: false,
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
        strokeSelect: {
          ...this.initStroke,
          [args.opponentChoice]: "#00af17",
          [args.yourChoice]: "#ca0202",
        },
      });
    });
    socket.on("win", (args) => {
      this.setState({
        opponentChoice: args.opponentChoice,
        roomStatus: "You Won \u{1F642}",
        strokeSelect: {
          ...this.initStroke,
          [args.opponentChoice]: "#ca0202",
          [args.yourChoice]: "#00af17",
        },
      });
    });
    socket.on("draw", (args) => {
      this.setState({
        opponentChoice: args.opponentChoice,
        roomStatus: "Draw \u{1F610}",
        strokeSelect: {
          ...this.initStroke,
          [args.opponentChoice]: "#ff9100",
          [args.yourChoice]: "#ff9100",
        },
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
          <h3>
            Your Choice: &#160;
            <span style={{ color: this.state.strokeSelect[this.state.choice] }}>
              {this.firstLetterCap(this.state.choice)}
            </span>
          </h3>

          <h3>
            Opponent's Choice: &#160;
            <span
              style={{
                color: this.state.strokeSelect[this.state.opponentChoice],
              }}
            >
              {this.firstLetterCap(this.state.opponentChoice)}
            </span>
          </h3>
        </div>
        <div className="tile-wrapper">
          <PfcTile
            name="rock"
            handleClick={(c) => this.handleClick(c)}
            stroke={this.state.strokeSelect.rock}
          />
          <PfcTile
            name="paper"
            handleClick={(c) => this.handleClick(c)}
            stroke={this.state.strokeSelect.paper}
          />
          <PfcTile
            name="scissor"
            handleClick={(c) => this.handleClick(c)}
            stroke={this.state.strokeSelect.scissor}
          />
        </div>
      </div>
    );
  }
}

export default App;

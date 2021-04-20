const pfcGame = require("./pfcController");
class IoController {
  constructor(io) {
    this.io = io;
    this.players = [];
    this.choice = {};
  }

  registerSocket(socket) {
    socket.on("join", () => this.addPlayer(socket));
    socket.on("choice", (args) => this.registerChoice(socket, args.choice));
    socket.on("disconnect", () => this.leave(socket));
  }
  registerChoice(socket, choice) {
    const socketId = socket.id;
    this.choice[socketId] = choice;
    const len = Object.keys(this.choice).length;
    if (len > 1) {
      const choiceVal = Object.values(this.choice);
      if (choiceVal.length === 2 && choiceVal.every((val) => val === choice)) {
        this.players.forEach((soc) =>
          soc.emit("draw", { opponentChoice: choiceVal[0] })
        );
        this.choice = {};
        return;
      }
      const winner = pfcGame(...Object.values(this.choice));
      const curPlayer = this.choice[socketId] === winner ? "win" : "lose";
      const opponent = curPlayer === "win" ? "lose" : "win";
      const opponentId = Object.keys(this.choice).filter(k => k != socketId);
      this.players.forEach((soc) => {
        soc.emit(soc.id === socketId ? curPlayer : opponent, {
          opponentChoice: (soc.id != socketId) ? this.choice[socketId] : this.choice[opponentId],
        });
      });
      this.choice = {};
    }
  }
  addPlayer(socket) {
    const idPlayers = this.players.map((socket) => socket.id);
    if (socket.id in idPlayers || this.players.length > 1) {
      socket.emit("wait");
    } else {
      this.players.push(socket);
      if (this.players.length === 1) socket.emit("wait_player");
      else socket.emit("join_success");
    }
  }

  leave(socket) {
    const socketId = socket.id;
    this.choice = {};
    this.players = this.players.filter(
      (socketPlayer) => socketPlayer.id != socketId
    );
    console.log(`${socket.id} is leaving`);
  }
}

module.exports = (io) => new IoController(io);
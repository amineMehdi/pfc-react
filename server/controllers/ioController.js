const pfcGame = require("./pfcController");
class IoController {
  constructor(io) {
    this.io = io;
    this.players = [];
    this.choice = {};
  }

  registerSocket(socket) {
    // socket.on("greatings", (user) => this.sayHello(socket, user.name));
    socket.on("disconnect", () => this.leave(socket));
    socket.on("join", () => this.addPlayer(socket));
    socket.on("show_players", () => console.log(this.players));
    socket.on("choice", (args) => this.registerChoice(socket, args.choice));
  }
  registerChoice(socket, choice){
    console.log(`${socket.id} : ${choice}`);
  }
  addPlayer(socket){
    if(socket.id in this.players || this.players.length > 1){
      socket.emit("wait");
    } else{
      this.players.push(socket.id);
      socket.emit("join_success");
    }
  }
  sayHello(socket, name) {
    console.log(`${name} is now connected with id ${socket.id}`);
    socket.emit("welcome");
  }

  leave(socket) {
    this.players = this.players.filter((id) => socket.id != id);
    console.log(`${socket.id} is leaving`);
  }
}

module.exports = (io) => new IoController(io);

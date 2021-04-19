function pfcGame(choice1, choice2) {
  const pfcOrder = {
    rock: 0,
    paper: 1,
    scissor: 2,
  };
  // console.log(choice1, choice2);
  switch (pfcOrder[choice1] - pfcOrder[choice2]) {
    case 1:
    case -2:
      return choice1;
    case -1:
    case 2:
      return choice2;
    default:
      return null;
  }
}
module.exports = (c1, c2) => pfcGame(c1, c2);

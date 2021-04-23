import React from "react";
import PropTypes from "prop-types";
import RockSvg from "./svg/RockSvg";
import PaperSvg from "./svg/PaperSvg.jsx";
import ScissorSvg from "./svg/ScissorSvg.jsx";
function PfcTile(props) {
  const handleClickTile = () => {
    props.handleClick(props.name);
    console.log(props.stroke);
    // setSelected(!selected);
  };
  let tile;
  if (props.name === "rock")
    tile = <RockSvg width={300} height={300} stroke={props.stroke} />;
  else if (props.name === "paper")
    tile = <PaperSvg width={300} height={300} stroke={props.stroke} />;
  else tile = <ScissorSvg width={300} height={300} stroke={props.stroke} />;
  return (
    <div className="tile">
      <div className="tile-image" onClick={handleClickTile}>
        {tile}
      </div>
      <div className="tile-name">
        <h2 style={{color : props.stroke}}> {props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h2>
      </div>
    </div>
  );
}
PfcTile.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  handleClick: PropTypes.func,
};

export default PfcTile;

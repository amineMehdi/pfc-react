import React from "react";
import PropTypes from "prop-types";
function PfcTile(props) {
  return (
    <div className="tile">
      <div className="tile-name">
        <h2>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </h2>
      </div>
      <div
        className="tile-image"
        onClick={() => props.handleClick(props.name)}
      >
        <img src={props.src} alt={props.name} />
      </div>
    </div>
  );
}
PfcTile.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  handleClick: PropTypes.func
};

export default PfcTile;
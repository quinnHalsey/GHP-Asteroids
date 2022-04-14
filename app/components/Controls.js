import React from "react";
import { connect } from "react-redux";
import { toggleAnimation } from "../store/controls";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function Controls(props) {
  return (
    <div id="control-panel">
      <IconButton onClick={() => props.toggleAnimation(!props.paused)}>
        {props.paused ? (
          <PlayArrowIcon className="animation-button" />
        ) : (
          <PauseIcon className="animation-button" />
        )}
      </IconButton>
      {/* <button
        type="button"
        onClick={() => props.toggleAnimation(!props.paused)}
      >
        {props.paused ? "Play" : "Pause"}
      </button> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    paused: state.paused,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleAnimation: (paused) => dispatch(toggleAnimation(paused)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

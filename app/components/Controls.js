import React from "react";
import { connect } from "react-redux";
import { toggleAnimation } from "../store/controls";

function Controls(props) {
  return (
    <div id="control-panel">
      <button
        type="button"
        onClick={() => props.toggleAnimation(!props.paused)}
      >
        {props.paused ? "Play" : "Pause"}
      </button>
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

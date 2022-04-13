import React from "react";

function Controls(props) {
  return (
    <div id="control-panel">
      <button type="button" onClick={() => props.pauseOrPlay()}>
        Pause
      </button>
    </div>
  );
}

export default Controls;

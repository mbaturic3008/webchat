import React from "react";

import { useState } from "react";

function Input(props) {
  const { onSlanjePoruke, boja } = props;

  const [upisaniText, setUpisaniText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    onSlanjePoruke(upisaniText);
    setUpisaniText("");
  };

  const changeHandler = (event) => {
    setUpisaniText(event.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          style={{ borderColor: boja }}
          type="text"
          value={upisaniText}
          onChange={changeHandler}
        />
        <button style={{ backgroundColor: boja }}>Send</button>
      </form>
    </div>
  );
}

export default Input;

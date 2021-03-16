import React, { useState } from "react";
import { render } from "react-dom";
import {
  Link,
  Element
} from "react-scroll";
import Weather from "./Weather";


class Section extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (

      <Weather />

    );
  }
}

render(<Section />, document.getElementById("root"));

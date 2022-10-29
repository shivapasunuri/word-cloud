import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import words from "./words";
import axios from "axios";
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .get("http://localhost:9000/words")
        .then((res) => {
          console.log(res.status);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);
  return (
    <div style={{ height: 400, width: 600 }}>
      <ReactWordcloud options={options} words={data} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

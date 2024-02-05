import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarityProvider from "./SimilarityProvider";

const SimilarityProgress = (props) => {
  const { score } = props;

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return "hsl(" + c + ", 100%, 50%)";
  };
  return (
    <SimilarityProvider valueStart={0} valueEnd={score}>
      {(value) => (
        <CircularProgressbar
          value={value}
          text={`${value} %`}
          circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
            },
            path: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
                stroke: calcColor(value, 0, 120),
            },
            // pathColor: `rgba(62, 152, 199, ${value / 100})`,
            text: {
              fill: "#ddd",
            },
          }}
          strokeWidth={5}
        />
      )}
    </SimilarityProvider>
  );
};

export default SimilarityProgress;

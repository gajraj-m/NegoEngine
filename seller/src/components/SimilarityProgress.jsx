import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarityProvider from "./SimilarityProvider";
import Cat from "../assets/cat.png";

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
        <CircularProgressbarWithChildren
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
              fill: "#19486d",
            },
          }}
          strokeWidth={3}
        >
          <img
            style={{ width: 140, marginTop: -150 }}
            src={Cat}
            // src="https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg"
            alt="doge"
          />
        </CircularProgressbarWithChildren>
      )}
    </SimilarityProvider>
  );
};

export default SimilarityProgress;

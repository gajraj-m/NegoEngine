import React from "react";
import { useSelector } from "react-redux";

const Nego = () => {
  const { currentSeller } = useSelector((state) => state.app);
  return <div className="mt-24">{currentSeller.name}</div>;
};

export default Nego;

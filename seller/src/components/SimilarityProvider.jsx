import React, { useState, useEffect } from "react";

const SimilarityProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
export default SimilarityProvider;

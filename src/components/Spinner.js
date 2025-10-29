"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};
const Spinner = () => {
  return (
    <ClipLoader
      color="#36d7b7"
      cssOverride={override}
      size={150}
      area-label="Loading"
    />
  );
};

export default Spinner;

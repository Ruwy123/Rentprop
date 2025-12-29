"use client";
import { Padding } from "maplibre-gl";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "bg-[#1E2D24]",
};
const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full page height
        width: "100vw", // full page width
      }}
    >
      <ClipLoader
        color="#36d7b7"
        cssOverride={override}
        size={100}
        area-label="Loading"
      />
    </div>
  );
};

export default LoadingPage;

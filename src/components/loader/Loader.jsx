import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <ColorRing
        visible={true}
        height="80"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#3333ff", "#3333ff", "#3333ff", "#3333ff", "#3333ff"]}
      />
    </>
  );
};

export default Loader;

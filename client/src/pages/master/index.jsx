import React from "react";
import "./master.scss";
import Navbar from "../../components/navbar/navbar";
import MasterMain from "../../components/master/masterMain";

const MasterData = () => {
  return (
    <>
      <div className="centroid_masterWrapper">
        <Navbar/>
        <MasterMain/>
      </div>
    </>
  );
};

export default MasterData;

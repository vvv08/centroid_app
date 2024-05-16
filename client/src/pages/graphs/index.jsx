import React, { useState } from "react";
import "./graphs.scss";
import Navbar from "../../components/navbar/navbar";
import GraphMain from "../../components/graphs/graphsMain";

const Graphs = () => {
  const [closeNav,setCloseNav] = useState(false)
  return (
    <>
      <div className="centroid_graphsWrapper">
        {!closeNav && <Navbar current_tab={"graphs"}/>}
        <GraphMain closeNav = {setCloseNav}/>
      </div>
    </>
  );
};

export default Graphs;

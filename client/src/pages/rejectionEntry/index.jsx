import React, { useEffect, useState, useRef } from "react";
import "./rejectionEntry.scss";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { padZero } from "../../validations/validations";
import Select from "react-select";
import {
  getRejectionEntry,
  getWorkOrders,
} from "../../repository/rejectionEntry";
import RejectionEntryComp from "../../components/rejectionEntry/home";

const RejectionEntry = () => {
  //To get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = padZero(currentDate.getMonth() + 1); // Months are zero-based (0 = January)
  const day = padZero(currentDate.getDate());
  const curr_date = `${year}-${month}-${day}`;

  const [rejectionInputs, setRejectionInputs] = useState({
    work_order: "",
  });
  const [rejectionEntries, setRejectionEntries] = useState([]);
  const [rejectionData, setRejectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSelectChange = (selectedOption) => {
    setRejectionInputs((state) => ({
      ...state,
      work_order: selectedOption.value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    getWorkOrders()
      .then((result) => {
        setRejectionData(result);
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert(err.response.data.Message);
          navigate("/maintenance");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getRejectionEntry(rejectionInputs)
      .then((result) => {
        setRejectionEntries(result);
      })
      .catch((err) => {
        if (err.response.data.status === "authenticationError") {
          alert(err.response.data.message);
          navigate("/login");
        } else {
          alert(err.response.data.Message);
          navigate("/maintenance");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rejectionInputs]);

  return (
    <>
      <div className="centroid_rejectionEntryWrapper">
        <Navbar current_tab={"rejectionEntry"} />
        <div className="centroid_rejectionEntryHeader">
          <h2>Rejection entry</h2>
        </div>
        <div className="centroid_rejectionEntryList">
          <div className="centroid_rejectionEntry_list_content">
            <label htmlFor="work_order">Choose a work order :</label>
            <Select
              id="work_order"
              className="rejectionEntry_select"
              options={rejectionData}
              onChange={handleSelectChange}
              value={rejectionData.find(
                (option) => option.value === rejectionInputs.work_order
              )}
            />
            {rejectionInputs.work_order && (
              <p>
                {
                  rejectionData.filter(
                    (f) => f.value === Number(rejectionInputs.work_order)
                  )[0].label
                }
              </p>
            )}
          </div>
        </div>

        {rejectionInputs.work_order && !loading ? (
          rejectionEntries ? (
            <div className="centroid_rejectionEntry">
              <RejectionEntryComp data={rejectionEntries} id = {rejectionInputs.work_order}/>
            </div>
          ) : (
            <div className="centroid_rejectionEntryLoading">
              <p>Loading...</p>
            </div>
          )
        ) : (
          <div className="centroid_rejectionEntryLoading">
            <p>Choose a work order</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RejectionEntry;

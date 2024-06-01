import React from 'react';
import './editIssuePage.scss';
import { useParams } from 'react-router-dom';
import EditIssuesComp from '../../../../components/customerRejection/issues/editIssues';

const EditIssuePage = () => {
    const { cust_rej_id } = useParams();
  return (
    <>
        <div className="centroid_editIssuePageWrapper">
                <div className="centroid_editIssuePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>Edit Issue</h1>
                <EditIssuesComp cust_rej_id = {cust_rej_id}/>
        </div>
    </>
  )
}

export default EditIssuePage

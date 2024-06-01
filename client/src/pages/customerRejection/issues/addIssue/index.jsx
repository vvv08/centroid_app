import React from 'react';
import './addIssuePage.scss';
import AddIssuesComp from '../../../../components/customerRejection/issues/addIssues';
import { useParams } from 'react-router-dom';

const AddIssuePage = () => {
    const { invoice_id } = useParams();
  return (
    <>
        <div className="centroid_addIssuePageWrapper">
                <div className="centroid_addIssuePage_back">
                    <button className='centroid_DeleteButton' onClick={() => {window.history.back()}}>Back</button>
                </div>
                <h1>New Problem</h1>
                <AddIssuesComp invoice_id={invoice_id}/>
        </div>
    </>
  )
}

export default AddIssuePage

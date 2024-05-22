import React from 'react';
import './addRejectionEntryPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import AddRejectionEntry from '../../../components/rejectionEntry/addRejectionEntry';

const AddRejectionEntryPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_addRejectionEntryPageWrapper">
                <div className="centroid_addRejectionEntryPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/rejectionEntry')}}>Back</button>
                </div>
                <h1>New Entry</h1>
            <AddRejectionEntry id = {id}/>
        </div>
    </>
  )
}

export default AddRejectionEntryPage

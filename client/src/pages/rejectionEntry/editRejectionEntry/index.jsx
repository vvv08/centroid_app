import React from 'react';
import './editRejectionEntryPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditRejectionEntryComp from '../../../components/rejectionEntry/editRejectionEntry';


const EditRejectionEntryPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
        <div className="centroid_editRejectionEntryPageWrapper">
                <div className="centroid_editRejectionEntryPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/rejectionEntry')}}>Back</button>
                </div>
                <h1>Edit Entry</h1>
                <EditRejectionEntryComp id = {id}/>
        </div>
    </>
  )
}

export default EditRejectionEntryPage

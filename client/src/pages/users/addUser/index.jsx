import React from 'react';
import './addUser.scss';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser = () => {
    const {type} = useParams();
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addUserWrapper">
                <div className="centroid_addUser_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/userList')}}>Back</button>
                </div>
                <h1>New User</h1>
        </div>
    </>
  )
}

export default AddUser

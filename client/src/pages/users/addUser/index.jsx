import React from 'react';
import './addUser.scss';
import { useNavigate, useParams } from 'react-router-dom';
import AddUserForm from '../../../components/users/addUser';

const AddUser = () => {
    const {type} = useParams();
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_addUserPageWrapper">
                <div className="centroid_addUserPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/userList')}}>Back</button>
                </div>
                <h1>New User</h1>
                <AddUserForm/>
        </div>
    </>
  )
}

export default AddUser

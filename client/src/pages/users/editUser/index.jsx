import React from 'react';
import './editUserPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditUserForm from '../../../components/users/editUser';

const EditUser = () => {
    const {id,name,type} = useParams();
    const navigate = useNavigate();
  return (
    <>
        <div className="centroid_editUserPageWrapper">
                <div className="centroid_editUserPage_back">
                    <button className='centroid_DeleteButton' onClick={() => {navigate('/userList')}}>Back</button>
                </div>
                <h1>Edit user</h1>
                <EditUserForm id = {id} name = {name} type = {type}/>
        </div>
    </>
  )
}

export default EditUser

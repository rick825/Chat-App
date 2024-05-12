import { useState, useEffect } from 'react';
import './Dashform.css';
import { useDashboardProvider } from '../../../context/DashboardContext';
import { useLoginStatus } from '../../../context/LoginContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditGroupForm = () => {
  const { formVisible, makeFormVisible, setRefresh, editGroup, setEditGroup } = useDashboardProvider();
  const { loggedInUser } = useLoginStatus();
  const [groupFormData, setGroupFormData] = useState({});

 
  useEffect(() => {
    if (editGroup) {
      setGroupFormData({
        name: editGroup.name || '',
        topic: editGroup.topic || '',
        participants: editGroup.participants || ''
      });
    }
  }, [editGroup]);

  // Form Disappear
  const formDisappear = () => {
    makeFormVisible('');
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupFormData({
      ...groupFormData,
      [name]: value
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/api/editGroup', {
        groupFormData,
        loggedInUser,
        editGroup
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success(response.data.Message);
        formDisappear();
        setRefresh(true);
        setEditGroup(null);
      }
    } catch (error) {
      console.log('Error while creating group', error);
      toast.error('Internal Server Error');
    }
  };

  return (
    <>
      {formVisible === 'edit' &&
        <div className="dashform">
          <div className="formhead">
            <h2>Edit Group Details:-</h2>
            <h1 className='cross' onClick={formDisappear}>×</h1>
          </div>
          <div className="formmain">
            <form onSubmit={handleSubmit} className='forms'>
             <label htmlFor="name">Enter Room Name:</label><br />
             <input type="text" name='name' value={groupFormData.name || ''} onChange={(e) => handleChange(e)} />
             <label htmlFor="topic">Enter Topic Name:</label><br />
             <input type="text" name='topic' value={groupFormData.topic || ''} onChange={(e) => handleChange(e)} />
             <label htmlFor="participants">Enter Number of Participants</label><br />
             <input type="number" name='participants' value={groupFormData.participants || ''} onChange={(e) => handleChange(e)} />
             <input type="submit" value="Create Room" />
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default EditGroupForm;

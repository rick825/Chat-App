import { useState } from 'react';
import './Dashform.css';
import { useDashboardProvider } from '../../../context/DashboardContext';
import { useLoginStatus } from '../../../context/LoginContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Dashform = () => {
  const { formVisible, makeFormVisible, setRefresh } = useDashboardProvider();
  const { loggedInUser } = useLoginStatus();
  const [groupFormData, setGroupFormData] = useState({});
 

  // Form Dissappear
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
      const uniqueId = uuidv4();
      console.log("Unique ID->", uniqueId);
      e.preventDefault();
      const response = await axios.post('/api/createGroup', {
        groupFormData,
        loggedInUser,
        uniqueId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        formDisappear();
        setRefresh(true);
      }
    } catch (error) {
      console.log('Error while creating group', error);
      toast.error('Internal Server Error');
    }
  };

  return (
    <>
      {formVisible==='create' &&
        <div className="dashform">
          <div className="formhead">
            <h2>Enter Below Details:-</h2>
            <h1 className='cross' onClick={formDisappear}>×</h1>
          </div>
          <div className="formmain">
            <form onSubmit={handleSubmit} className='forms'>
              <label htmlFor="name">Enter Room Name:</label><br />
              <input type="text" name='name' placeholder='Enter Room Name' onChange={(e) => handleChange(e)} />
              <label htmlFor="topic">Enter Topic Name:</label><br />
              <input type="text" name='topic' placeholder='Enter Topic Name' onChange={(e) => handleChange(e)} />
              <label htmlFor="participants">Enter Number of Participants</label><br />
              <input type="number" name='participants' placeholder='Enter Total Participants' onChange={(e) => handleChange(e)} />
              <input type="submit" value="Create Room" />
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default Dashform;

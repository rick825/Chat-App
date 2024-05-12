import { useEffect, useState } from 'react';
import './Profile.css'
import axios from 'axios'
import {useLoginStatus} from '../../../context/LoginContext';


export const Profile = () =>{

 const {loggedInUser} = useLoginStatus(); 
 const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    if (profileImage) {
      handleImageUpload();
    }
  }, [profileImage]);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleImageUpload = async () => {
    try {
      if (!profileImage) {
        console.log("No image selected.");
        return;
      }
      const formData = new FormData();
      formData.append('profile', profileImage);
  
      const response = await axios.post('/api/upload-profile-image', formData,loggedInUser, {
        headers: {
          'Content-Type': 'multipart/form-data ,application/json',
        }
      });
      console.log("Image uploaded:", response.data);
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return(<>
     
     <div className="profile">
        <div className="profile-top">
            <div className="profile-main">
                <div className="profile-img">
                {profileImage? (
                    <img src={URL.createObjectURL(profileImage)} alt="profile" />
                  ) : (
                    <img src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png" alt="user-male-circle" />
                  )}
                </div>
                {!profileImage && (
                  <div className="addimage">
                  <input type="file" name='profile' onChange={handleImageChange} />
                </div>
                )}
                <div className="profile-Name">
                    <h1>{loggedInUser.fname} {loggedInUser.lname}</h1>
                </div>
                <div className="profile-button">
                    <button>Add Photo</button>
                    <button>Edit Profile</button>
                </div>
            </div>
        </div>
        <div className="profile-bot">

        </div>
     </div>
  
  </>)
}


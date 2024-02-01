import React, { useState } from 'react';

const ProfilePhotoUpload = ({ onProfilePhotoChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onProfilePhotoChange(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
    <label htmlFor="profilePhotoInput" style={{ cursor: 'pointer' }}>
  Add Photo
  <input
    type="file"
    accept="image/*"
    id="profilePhotoInput"
    style={{ display: 'none' }}
    onChange={handleFileChange}
  />
</label>


      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;

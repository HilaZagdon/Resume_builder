import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProfilePhotoUpload from '../ProfilePhotoUpload/PhotoUpload';
export default function PersonalDetails({ updateFormData }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handleProfilePhotoChange = (photo) => {
    setProfilePhoto(photo);
    updateFormData('profilePhoto', photo); 
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell us a little about yourself
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => updateFormData('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => updateFormData('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1">Profile Photo</Typography>
          <ProfilePhotoUpload onProfilePhotoChange={handleProfilePhotoChange} />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            autoComplete="organization"
            variant="standard"
            onChange={(e) => updateFormData('occupation', e.target.value)}
          />
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="street-address"
            variant="standard"
            multiline
            rows={3}
            onChange={(e) => updateFormData('address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="tel"
            variant="standard"
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email1"
            name="email1"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            onChange={(e) => updateFormData('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nationality"
            name="nationality"
            label="Nationality"
            fullWidth
            variant="standard"
            onChange={(e) => updateFormData('nationality', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            fullWidth
            variant="standard"
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="linkedin"
            name="linkedin"
            label="LinkedIn Profile"
            fullWidth
            variant="standard"
            onChange={(e) => updateFormData('linkedin', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="hideAdditionalFields" value="yes" />}
            label="Hide additional fields"
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
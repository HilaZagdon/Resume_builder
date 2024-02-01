import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function Experience({ updateFormData }) {
  const [workplaces, setWorkplaces] = React.useState([{ id: 1 }]);

  const addWorkplace = () => {
    setWorkplaces((prevWorkplaces) => [
      ...prevWorkplaces,
      { id: prevWorkplaces.length + 1 },
    ]);
  };

  const handleInputChange = (event, workplaceId, fieldName) => {
    const updatedWorkplaces = workplaces.map((workplace) =>
      workplace.id === workplaceId
        ? { ...workplace, [fieldName]: event.target.value }
        : workplace
    );
  
    setWorkplaces(updatedWorkplaces);
    updateFormData(workplaces[workplaceId - 1]);
  };
  


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      {workplaces.map((workplace) => (
        <Grid container spacing={3} key={workplace.id}>
          <Grid item xs={12} sm={12}>
            <br></br>
            <Typography
              variant="h6"
              gutterBottom
            >{`Workplace ${workplace.id}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={`CompanyName${workplace.id}`}
              name={`CompanyName${workplace.id}`}
              label="Company Name"
              fullWidth
              variant="standard"
              onChange={(event) =>
                handleInputChange(event, workplace.id, "companyName")
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={`Position${workplace.id}`}
              name={`Position${workplace.id}`}
              label="Position"
              fullWidth
              variant="standard"
              onChange={(event) =>
                handleInputChange(event, workplace.id, "Position")
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id={`EndYear${workplace.id}`}
              name={`EndYear${workplace.id}`}
              label="End Year"
              fullWidth
              variant="standard"
              onChange={(event) =>
                handleInputChange(event, workplace.id, "EndYear")
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={`StartYear${workplace.id}`}
              name={`StartYear${workplace.id}`}
              label="Start Year"
              fullWidth
              variant="standard"
              multiline
              rows={1}
              onChange={(event) =>
                handleInputChange(event, workplace.id, "StartYear")
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id={`aboutYourself${workplace.id}`}
              name={`aboutYourself${workplace.id}`}
              label="Summarize your work experience"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              onChange={(event) =>
                handleInputChange(event, workplace.id, "aboutYourself")
              }
            />
          </Grid>
        </Grid>
      ))}
      <br></br>
      <Button variant="contained" onClick={addWorkplace}>
        Add Another Workplace
      </Button>
    </React.Fragment>
  );
}

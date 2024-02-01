import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import { dataBase } from "../../Config/firebaseConfig";
import { UserContext } from "../../context/UserContext";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const { user } = useContext(UserContext);
  const resumesRef = collection(dataBase, "resumes");

  const getMyResumes = async () => {
    try {
      if (!user) {
        return;
      }
      const q = query(resumesRef, where("user", "==", user.uid));
      const rowDocs = await getDocs(q);
      const docs = rowDocs.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setResumes(docs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyResumes();
  }, [user]);

  const handleDownloadPDF = (resume) => {
    const content = document.getElementById(`resume-${resume.uid}`);

    const clone = content.cloneNode(true);
    const buttonToRemove = clone.querySelector(".exclude-in-pdf");
    if (buttonToRemove) {
      buttonToRemove.parentNode.removeChild(buttonToRemove);
    }

    const pdf = new html2pdf(clone, {
      margin: 10,
    });
    pdf.save(`${resume.uid}_resume.pdf`);
  };

  return (
    <div>
      <h1>My Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <ul>
          {resumes.map((resume) => (
            <li key={resume.uid}>
              <div id={`resume-${resume.uid}`}>
                <h1>My Resume</h1>
                <div>
                  <h2>Personal Information</h2>
                  <div>
                    <p>First Name: {resume.personalInfo.firstName}</p>
                    <p>Last Name: {resume.personalInfo.lastName}</p>
                    <p>Email: {resume.personalInfo.email}</p>
                    <p>Nationality: {resume.personalInfo.nationality}</p>
                    <p>Phone: {resume.personalInfo.phone}</p>
                    <p>Date of Birth: {resume.personalInfo.dateOfBirth}</p>
                    <p>LinkedIn: {resume.personalInfo.linkedin}</p>
                  </div>
                  <hr />
                  <h2>Education</h2>
                  <div>
                    <p>School: {resume.education.university}</p>
                    <p>Degree: {resume.education.degree}</p>
                    <p>Field of Study: {resume.education.studyLocation}</p>
                    <p>Start Date: {resume.education.graduationYear}</p>
                    <p>End Date: {resume.education.aboutEducation}</p>
                    <hr />
                  </div>
                  <h2>Experience</h2>
                  {resume.experience.map((workplace, index) => (
    <div key={index}>
      <p>Company: {workplace.CompanyName}</p>
      <p>Position: {workplace.Position}</p>
      <p>Start Year: {workplace.StartYear}</p>
      <p>End Year: {workplace.EndYear}</p>
      <p>About Yourself: {workplace.aboutYourself}</p>
      <hr />
    </div>
  ))}
                </div>
                {/* Add the 'exclude-in-pdf' class to the button */}
                <button
                  className="exclude-in-pdf"
                  onClick={() => handleDownloadPDF(resume)}
                >
                  Download PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyResumes;

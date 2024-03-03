import React, { useState, useEffect, useContext } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import html2pdf from "html2pdf.js";
import { dataBase } from "../../Config/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import "./MyResumes.css";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const { user } = useContext(UserContext);
  const resumesRef = collection(dataBase, "resumes");

  useEffect(() => {
    getMyResumes();
  }, [user]);

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

  const handleDownloadPDF = (resume) => {
    const content = document.getElementById(`resume-${resume.uid}`);

    const clone = content.cloneNode(true);
    const buttonsToRemove = clone.querySelectorAll(".exclude-in-pdf");
    buttonsToRemove.forEach((button) => button.parentNode.removeChild(button));

    const pdf = new html2pdf(clone, {
      margin: 0,
    });
    pdf.save(`${resume.uid}_resume.pdf`);
  };

  const handleDeleteResume = async (resumeId) => {
    console.log("Deleting resume with ID:", resumeId);
    try {
      console.log("Before deletion - Resumes state:", resumes);

      setResumes(resumes.filter((resume) => resume.uid !== resumeId));

      await deleteDoc(doc(resumesRef, resumeId));
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };

  return (
    <div>
      <h1>My Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <div className="bigContainer">
          {resumes.map((resume) => (
            <div className="resumeContainer" id={`resume-${resume.uid}`}>
              <div className="leftContent">
                <h1 className="NameOfResume">
                  {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                </h1>
                <div className="EducationContainer">
                  <h3>Education</h3>
                  <div className="educationDetails">
                    <div className="educationIndex">
                      <div className="DatesOf-start-end">
                        <p>
                          {resume.education.startingYear} -{" "}
                          {resume.education.graduationYear}
                        </p>
                      </div>
                      <div className="educationDescription">
                        <p>
                          {resume.education.university},{" "}
                          {resume.education.studyLocation}
                        </p>
                        <p>Degree: {resume.education.degree}</p>
                        <p>{resume.education.aboutEducation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ExperienceContainer">
                  <h3>Experience</h3>
                  {resume.experience.map((workplace, index) => (
                    <div className="workplaceIndex" key={index}>
                      <div className="DatesOf-start-end">
                        <p>
                          {workplace.StartYear} - {workplace.EndYear}
                        </p>
                      </div>
                      <div className="workplaceDetails">
                        <p>Company: {workplace.CompanyName}</p>
                        <p>Position: {workplace.Position}</p>
                        <p>About Yourself: {workplace.aboutYourself}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rightContent">
                <div className="PersonalContainer">
                <div className="profilePhoto">
                {resume.personalInfo.profilePhoto && (
                  <img 
                    src={resume.personalInfo.profilePhoto}
                    alt="Profile"
                    style={{ width: 150, height: 150, borderRadius: "50%" }}
                  />
                )}
              </div>
                  <div>
                    <p>
                      <i className="fa-regular fa-envelope"></i>{" "}
                      {resume.personalInfo.email}
                    </p>
                    <p>
                      <i className="fa-solid fa-phone"></i>{" "}
                      {resume.personalInfo.phone}
                    </p>
                    <p>
                      <i className="fa-regular fa-calendar"></i>{" "}
                      {resume.personalInfo.dateOfBirth}
                    </p>
                    <p>
                    <i className="fa-regular fa-map"></i>{" "}
                      {resume.personalInfo.address}
                    </p>
                    <p>
                      <i className="fa-solid fa-globe"></i>{" "}
                      {resume.personalInfo.nationality}
                    </p>
                    <p>
                      <i className="fa-brands fa-linkedin"></i>{" "}
                      {resume.personalInfo.linkedin}
                    </p>
                  </div>
                </div>

                <div className="buttonsContainer">
                  <button
                    className="exclude-in-pdf"
                    onClick={() => handleDownloadPDF(resume)}
                  >
                    Download PDF
                  </button>
                  <button
                    className="exclude-in-pdf"
                    onClick={() => handleDeleteResume(resume.uid)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;

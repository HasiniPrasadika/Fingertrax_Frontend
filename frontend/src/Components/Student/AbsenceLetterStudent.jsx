import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import './Student Styles/AbsenceLetterStudent.css';

const AbsenceApplication = () => {

  //add Absence Letter
  const [absStuName, setabsStuName] = useState("");
  const [absRegNo, setabsRegNo] = useState("");
  const [absModCode, setabsModCode] = useState("");
  const [absModName, setabsModName] = useState("");
  const [absDate, setabsDate] = useState("");
  const [absLecHours, setabsLecHours] = useState("");
  const [description, setdescription] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [letters, setletters] = useState(null);
  const [viewLetters, setviewLetters] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleFileChange = (e) => {
    setletters(e.target.files[0]);
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("absStuName", absStuName);
      formData.append("absRegNo", absRegNo);
      formData.append("absModCode", absModCode);
      formData.append("absModName", absModName);
      formData.append("absDate", absDate);
      formData.append("absLecHours", absLecHours);
      formData.append("description", description);
      formData.append("pdf", letters);

      axios
        .post("https://server-eta-gules.vercel.app/api/absenceletters/addletter", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            setSMessage("Absence letter submission successfully!");
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setMessage("Absence Letter is already submitted");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
          else if (error.response.status === 400) {
            setMessage("Error Submitting Absence Letter!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        });
    } catch (error) {
      setMessage("Failed to upload absense letter!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

  };

  const resetHandler = () => {
    setabsStuName("");
    setabsRegNo("");
    setabsModCode("");
    setabsModName("");
    setabsDate("");
    setabsLecHours("");
    setdescription("");
    setletters(null);
  };

  const resetFileUpload = () => {
    setletters(null);
  };


  // view letters
  useEffect(() => {

    if (userInfo) {
      const encodedRegNo = encodeURIComponent(userInfo.regNo);
      axios
        .get(`https://server-eta-gules.vercel.app/api/absenceletters/getAbsenceStu/${encodedRegNo}`)
        .then((response) => {
          setviewLetters(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error of view absence letters", error);
        });
    }

  }, [userInfo]);
  

  const getActionStatus = (action) => {

    if (action === true) {
      return "Accepted";
    } else if (action === false) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };


  return (
    <div className="ab">
      <div className="absence-container">
      <div>
        <span style={{ opacity: "0.8", padding: "5px", fontSize: "12px" }}>
          <GoTriangleRight />
          Absence Application
        </span>
      </div>
      <div className="absence-form-container">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}
        <h4>Absence Application</h4>

        <form onSubmit={submitHandler}>
          <div className="form-row">

            <div className="form-group col-md-6">
              <label htmlFor="inputname">Name of the Student:</label>
              <input type="text" className="form-control" id="inputname"
                value={absStuName} onChange={(e) => { setabsStuName(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputregno">Registration No: </label>
              <input type="text" className="form-control" id="inputregno"
                value={absRegNo} onChange={(e) => { setabsRegNo(e.target.value) }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputmodule">Module Code:</label>
              <input type="text" className="form-control" id="inputmodule"
                value={absModCode} onChange={(e) => { setabsModCode(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputmodulename">Module Name: </label>
              <input type="text" className="form-control" id="inputmodulename"
                value={absModName} onChange={(e) => { setabsModName(e.target.value) }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputdate">Date: </label>
              <input type="date" className="form-control" id="inputdate"
                value={absDate} onChange={(e) => { setabsDate(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputlecturehours">Lecture Hours: </label>
              <input type="text" className="form-control" id="inputlecturehours"
                value={absLecHours} onChange={(e) => { setabsLecHours(e.target.value) }} />
            </div>
          </div>

          <div className="form-group form-group">
            <label htmlFor="inputdescription">Description:</label>
            <textarea
              className="form-control"
              id="inputdescription"
              rows="3"
              value={description} onChange={(e) => { setdescription(e.target.value) }}
            ></textarea>
          </div>


          <div className="upload-file" style={{ padding: "20px" }}>
            <div className="doted-border">
              <div>
                <span>Select a file here</span>
              </div>
              <div style={{ opacity: "0.6", fontSize: "13.5px" }}>
                <span>PDF file size no more than 10MB</span>
              </div>
              <div>
                <input
                  type="file"
                  id="inputpdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}

                />
                <button
                  type="button"
                  className="upload-button"
                  style={{
                    width: "85px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                    marginTop: "15px"
                  }}
                  onClick={() => document.getElementById("inputpdf").click()}
                >Upload</button>

              </div>

              <div className="upload-file" style={{ display: "flex", alignItems: "center" }}>

                <div className="file-border" >
                  <div style={{display:'flex', overflowX:'hidden'}}>{letters && <p>{letters.name}</p>}</div>
                </div>
                      <MdOutlineCancelPresentation onClick={resetFileUpload} style={{fontSize:'30px', color:'gray'}}/>
              </div>
            </div>
          </div>

          <div className="form-row">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignItems:'center', marginRight:'20px', justifyContent:"center"}} > Submit
            </button>

            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "gray" , borderBlockColor:'gray'}}
              onClick={resetHandler}
            >
              Reset
            </button>
          </div>
        </form>
      </div>


      <div>
        <h4 className="topic-style-ab">Excuse Applications</h4>
      </div>
      <div className="excuse-application">
        <div className="abs-table-wrapper">
          <table class="abs-add-table">
            <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
              <tr>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>#</th>
                <th scope="col" style={{ width: "5px" }}>Absence Module</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence Date</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence For</th>
                <th scope="col"style={{ width: "5px", textAlign: "center" }}>Application form</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewLetters.map((letter, index) => (
                <tr key={letter._id}>
                  <th style={{ textAlign: "center" }} scope="row">{index + 1}</th>

                  <td>{letter.absModName}</td>
                  <td>{letter.absDate}</td>
                  <td>{letter.absLecHours}</td>
                  <td>
                    <a href={letter.letters.url} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-primary">View</button>
                    </a>
                  </td>
                  <td style={{
                    color: letter.action === true ? "green"
                      : letter.action === false ? "red" : "blue" }}>                  
                    {getActionStatus(letter.action)}
                    </td>
                </tr>

              ))}


            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    
  );

}

export default AbsenceApplication;
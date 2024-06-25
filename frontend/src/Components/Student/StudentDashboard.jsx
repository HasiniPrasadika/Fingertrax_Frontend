import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../Admin/Admin Styles/AdminDashboard.css";
import "../Lecturer/Lecturer Styles/LecturerDashboard.css";
import "./Student Styles/StudentDashboard.css";

const StudentDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://server-eta-gules.vercel.app/api/modules/getallmod")
      .then((response) => {
        const filteredModules = response.data.filter((module) =>
          module.students.some((student) => student.regNo === userInfo.regNo)
        );
        
        setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, [modules]);
  const handleModuleClick = (module) => {
    navigate(`/dashboard/view_module/${module.modCode}`, { state: { module } });
  };

  return (
    <div className="student-dashboard-container">
      <div className="ruhuna-details">
        <span>
          <GoTriangleRight />
          Student Dashboard{" "}
        </span>

        <div className="row">
          <img className="imagelogo" src="/Images/logo_ruhuna.jpg" />
          <div className="ruhuna-details-font">
            <span className="faculty">Faculty of Engineering</span>

            <span className="campus">University of Ruhuna</span>
          </div>
        </div>
      </div>

      <div className="student-content-container">
      <div className="student-module-content">
          <h4 className="enrolled-status">Enrolled Status</h4>
          
        </div>
       <div className="stu-module-container">
       {modules.map((module, index) => (
          <div className="module-box" key={index}>
            <div className="module-name">
              <div style={{ fontWeight: "bold", margin: "5px" }}>
                <span>{module.modCode} </span>
              </div>
              <div style={{ fontWeight: "normal", margin: "5px" }}>
                <span>{module.modName}</span>
              </div>
            </div>
            <div className="module-info">
              <a
                key={module._id}
                onClick={() => handleModuleClick(module)}
                
              >
                <span style={{ marginRight: "5px" }}>More Info</span>
                <span style={{ fontSize: "20px" }}>
                  <MdOutlineArrowCircleRight />
                </span>
              </a>
            </div>
          </div>
        ))}
       </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

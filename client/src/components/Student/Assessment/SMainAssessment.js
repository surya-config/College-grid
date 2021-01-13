import axios from "axios";
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Assessment.css";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function SMainAssessment() {
  const [quizes,setQuizes] = useState(null);
  console.log({quizes});

  useEffect(() => {
    axios.get("/get-quizes").then((res) => setQuizes(res.data)).catch(e => console.log(e))
  }, [])

  return (
    <div className="sassessment">
      <h1>Assessment</h1>
    
      <div className="quiz__cardSection">
      {quizes?.map(quiz => (
        <Link to={`/student/dashboard/assessment/${quiz._id}`}>
        
            <div className="sassessment__card" key={quiz._id}>
            <div className="sassessment__cardContent">
              <AssignmentOutlinedIcon />
              <h3>{quiz?.quizName}</h3>
              
            </div>
           
          </div>
        
      </Link>
      ))}
      </div>
      
    </div>
  );
}

export default connect(mapStateToProps)(SMainAssessment);

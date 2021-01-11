import axios from "axios";
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Assessment.css";

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
    <div className="assessment">
      <h1>Assessment</h1>
    
      {quizes?.map(quiz => (
        <Link to={`/student/dashboard/assessment/${quiz._id}`}>
        <h4>{quiz?.quizName}</h4>
      </Link>
      ))}
    </div>
  );
}

export default connect(mapStateToProps)(SMainAssessment);

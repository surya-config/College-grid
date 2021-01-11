import axios from "axios";
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./Assessment.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function SAssessment(props) {
  const [quiz,setQuiz] = useState(null);
  console.log({quiz});
  const {id} = useParams();

  console.log({id});

  useEffect(async() => {
    const quiz_id = { id: id };
    console.log({quiz_id});

   await axios.get("/get-quiz", {id:id}).then((res) => setQuiz(res.data)).catch(e => console.log(e))
  }, [id])

  return (
    <div className="assessment">
      <h1>Assessment</h1>
    
    
        <div>
        <h4>{quiz?.quizName}</h4>
      </div>
     
    </div>
  );
}

export default connect(mapStateToProps)(SAssessment);

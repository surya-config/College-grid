import axios from "axios";
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./Assessment.css";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function SAssessment(props) {
  const [quiz,setQuiz] = useState(null);
  const {id} = useParams();
  const [value, setValue] = React.useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

    console.log(score);

  const handleChange = (event,idx) => {
    let data = [...value];
    data[idx] = event.target.value
    setValue(data);
  };

  useEffect(async() => {
   await axios.post("/get-quiz", {id:id}).then((res) => setQuiz(res.data)).catch(e => console.log(e))
  }, [id])

  useEffect(() => {
   let length_of_questions = quiz?.questionsArray.length;
   let data = [];

   for (var i = 0; i < length_of_questions; i++) {
    data[i] = "0"
}
  setValue(data)
  }, [quiz])  

  const handleSubmit = () => {
    quiz.questionsArray.map((question,idx) => {
      let val = parseInt(value[idx])
      if(question.answer === val){
        setScore(prevCount => prevCount + 1)
 
      }
    })

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
   

  }

  return (
    <div className="sassessment">
      <h1 className="quiz__title">{quiz?.quizName}</h1>
      <div >
        {submitted === false ? 
          <div >
         
        {quiz?.questionsArray.map((question,idx) => (
            <div className="question__card" key={idx}>
          
            <h5>Question {idx+1}</h5>
          
           <h4>{question.question}</h4>
  
           <FormControl component="fieldset">
           <RadioGroup aria-label="gender" name="" value={value[idx]} onChange={(event)=>handleChange(event,idx)}>
             <FormControlLabel value={"1"} control={<Radio />} label={question.option1} />
             <FormControlLabel value={"2"} control={<Radio />} label={question.option2} />
             <FormControlLabel value={"3"} control={<Radio />} label={question.option3} />
             <FormControlLabel value={"4"} control={<Radio />} label={question.option4} />
           </RadioGroup>
         </FormControl>
  
  
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          </div> : 
          <div>
          <h1>Result : {score}/{quiz?.questionsArray.length}</h1>
          </div>
        }
          </div>
    </div>
  );
}

export default connect(mapStateToProps)(SAssessment);

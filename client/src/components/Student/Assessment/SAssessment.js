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

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}



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
    {submitted === false ?
    <img className="quiz__image" src="https://image.freepik.com/free-vector/manager-completing-tasks-time-vector-illustration_92753-1226.jpg" alt="" /> 
    : 
    <img className="result__image" src=" https://image.freepik.com/free-vector/completed-concept-illustration_114360-3891.jpg" alt="" />
  }
   
    <div className="quiz__title">
      <h3>Quiz Name:   </h3>
      <h4>{quiz?.quizName}</h4>
      
      </div>
      <div className="quiz__div">
        {submitted === false ? 
          <div >
         
        {quiz?.questionsArray.map((question,idx) => (
            <div className="question__card" key={idx}>
          
            <h5 >Question {idx+1}</h5>
          
           <h4>{question.question}</h4>
  
           <FormControl component="fieldset">
           <RadioGroup aria-label="gender" name="" value={value[idx]} onChange={(event)=>handleChange(event,idx)}>
             <FormControlLabel value={"1"} control={<StyledRadio  />} label={question.option1} />
             <FormControlLabel value={"2"} control={<StyledRadio  />} label={question.option2} />
             <FormControlLabel value={"3"} control={<StyledRadio  />} label={question.option3} />
             <FormControlLabel value={"4"} control={<StyledRadio  />} label={question.option4} />
           </RadioGroup>
         </FormControl>
  
  
            </div>
          ))}
          <button className="submit__button" onClick={handleSubmit}>Submit</button>
          </div> : 
          <div className="result">
          <h1>Result : {score}/{quiz?.questionsArray.length}</h1>
          <h4>Successfully completed the quiz.</h4>
          </div>
        }
          </div>
    </div>
  );
}

export default connect(mapStateToProps)(SAssessment);

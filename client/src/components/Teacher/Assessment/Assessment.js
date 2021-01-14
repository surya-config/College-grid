import { Input } from "@material-ui/core";
import React,{useState} from "react";

import "./Assessment.css";
import Assessment__Body from "./Assessment__Body/Assessment__Body";
import Sidebar from "./Sidebar/Sidebar";

import axios from "../../../axios"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function TAssessment(props) {
  const [questionsArray,setQuestionsArray] = useState([])
  const classes = useStyles();

  const basic_details = props.location.state;

  const data = {
    question:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
  };

 
  const submitDetails = () => {
    var details = {
      quizName : basic_details.quizName,
      semester: basic_details.semester,
      email: basic_details.email,
      questionsArray: questionsArray,
    }
    console.log({details})
    axios.post("/create-quiz", details).then((res)=>{
      console.log(res)
    }).catch(e => console.log(e))

  }


  return (
    <div className="assessment">
      <div className="assessment__header">
      <h1>Quiz Name :</h1>
      <button className="assessment__quizButton" onClick={()=>{
        setQuestionsArray([...questionsArray, data]) 
       }}>+</button>
      </div>

      <div className="questionArray__container">
      {questionsArray?.map((item, idx) => (
        <div className="question__card" key={idx}>
        
        <h4>Question {idx+1} of {questionsArray.length}</h4>
      
        <div className="assessment__textArea">
         <textarea
          className="textarea"
          rows="7"
          cols="100"
          placeholder={questionsArray.question}
          value={questionsArray.question} onChange={(e)=>{
            let item = [...questionsArray];
            item[idx].question = e.target.value;
            setQuestionsArray(item)
          }}
         /> 
      </div>

      <div className="assessment__options">
          <div className="assessment__options1">
          <input type="text"   placeholder={"Option 1"}
          value={questionsArray.option1} onChange={(e)=>{
            let item = [...questionsArray];
            item[idx].option1 = e.target.value;
            setQuestionsArray(item)
          }} />
          <input type="text"   placeholder={"Option 2"}
          value={questionsArray.option2} onChange={(e)=>{
            let item = [...questionsArray];
            item[idx].option2 = e.target.value;
            setQuestionsArray(item)
          }} />
          </div>
          <div className="assessment__options2">
          <input type="text"   placeholder={"Option 3"}
          value={questionsArray.option1} onChange={(e)=>{
            let item = [...questionsArray];
            item[idx].option3 = e.target.value;
            setQuestionsArray(item)
          }} />
          <input type="text"   placeholder={"Option 4"}
          value={questionsArray.option1} onChange={(e)=>{
            let item = [...questionsArray];
            item[idx].option4 = e.target.value;
            setQuestionsArray(item)
          }} />

          </div>

         
     
      </div>  
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Answer Option</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        
        value={questionsArray.answer} onChange={(e)=>{
          let item = [...questionsArray];
          item[idx].answer = e.target.value;
          setQuestionsArray(item)
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
        </div>
        ))}
        </div>
      <button className="assessment__submitButton" onClick={submitDetails}>Submit</button>
    </div>
  );
}

export default TAssessment;


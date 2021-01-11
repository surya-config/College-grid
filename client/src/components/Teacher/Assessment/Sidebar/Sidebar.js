import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { IconButton } from "@material-ui/core";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import TitleIcon from "@material-ui/icons/Title";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

import axios from "../../../../axios";
import { Link, useHistory } from "react-router-dom";


import { connect, useDispatch } from "react-redux";

import {
  setQuestionId
} from "../../../../actions/authActions";

const mapStateToProps = (state) => ({
  question_id: state.question_id
});


const mapDispatchToProps = {
  setQuestionId
};

function Sidebar() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [border, setborder] = useState(false);
  const dispatch = useDispatch();

  const [questionsArray, setQuestionsArray] = useState([]);


  useEffect(() => {
    axios.get("/questions").then((response) => {
      setQuestions(response.data);
    });
  }, [questions]);

  const addQuestion =  () => {
    const question = {
      question: "",
      question_type: "",
    };
     axios.post("/questions/add", question).then((res) => {
      console.log(res);
    });
  };

  const deleteQuestion = (id) => {
    console.log("deleting")
    const qn_id = { id: id };
    console.log(qn_id);
    axios.post("/questions/delete", qn_id).then((res) => {
      console.log(res);
    });
  };

  

  const activeCard = (id) => {
    questions.map((item) => {
      // let cardItem = document.querySelector(".question__card");
      // cardItem.classList.add("question__cardInactive");
      //cardItem.classList.remove("question__cardActive");
      setborder(false);
      if (item._id === id) {
        // console.log(item._id, id);
        setborder(true);
        //cardItem.classList.add("question__cardActive");
        // cardItem.classList.remove("question__cardInactive");
      }
    });
  };

  const handleQuestionsArray = (newValue,idx) => {
    let item = [...questionsArray];
    item[idx] = newValue
    setQuestionsArray(item)
  }

  console.log({questionsArray});

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerComponents">
          <IconButton className="icon-button" onClick={addQuestion}>
            <AddIcon className="sidebar__headerComponent" />
          </IconButton>
          <h3>Add Question</h3>
        </div>
      </div>
      <div className="sidebar__body">
        {questions.map((item, index) => (
          <Link to={`/teacher/dashboard/assessment/quiz/${item._id}`} key={item._id} >
            <div
              tabindex="0"
              className={
                border === true
                  ? "question__card question__cardActive"
                  : "question__card question__cardInactive "
              }
              key={item._id}
              onClick={() => {
                activeCard(item._id)
                dispatch(setQuestionId(item._id))
              }}
            >
              <div className="question__cardHeader">
                <h3>Question {index + 1}</h3>
                <div className="question__cardHeaderIcons">
                  {" "}
                  <DeleteIcon
                    className="question__cardHeaderIcon"
                    onClick={() => deleteQuestion(item._id)}
                  />
                  <DragIndicatorIcon className="question__cardHeaderIcon" />
                </div>
              </div>
              <div className="question__cardBody">
                <p>{item.question}</p>
               
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);


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

import axios from "../axios";
import { Link, useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [border, setborder] = useState(false);

  useEffect(() => {
    axios.get("/questions").then((response) => {
      setQuestions(response.data);
    });
  }, [questions]);

  const addQuestion = () => {
    const question = {
      question: "",
      question_type: "",
    };
    axios.post("/questions/add", question).then((res) => {
      console.log(res);
    });
  };

  const deleteQuestion = (id) => {
    const qn_id = { id: id };
    console.log(qn_id);
    axios.post("/questions/delete", qn_id).then((res) => {
      console.log(res);
    });
  };

  const renderSwitch = (question_type) => {
    switch (question_type) {
      case "Video":
        return <VideocamOutlinedIcon />;
      case "Audio":
        return <MicNoneOutlinedIcon />;
      case "Multiple Choice":
        return <FormatListBulletedIcon />;
      case "Text":
        return <TitleIcon />;
      case "Mcq with multiple answers":
        return <FormatListBulletedIcon />;
      case "File":
        return <InsertDriveFileIcon />;
      default:
        return null;
    }
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
          <Link to={`/dashboard/assessment/${item._id}`}>
            <div
              tabindex="0"
              className={
                border === true
                  ? "question__card question__cardActive"
                  : "question__card question__cardInactive "
              }
              onClick={() => activeCard(item._id)}
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
                <div className="question__cardFooter">
                  {renderSwitch(item.question_type)}
                  <h6>{item.question_type}</h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useCallback, useEffect, useState } from "react";
import "./Assessment__Body.css";
import axios from "../axios";

import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Link, useParams } from "react-router-dom";
import TitleIcon from "@material-ui/icons/Title";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";

function Assessment__Body() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Choose Question type");

  const [inputList, setInputList] = useState([{ answer: "", points: "" }]);
  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFilesArray, setSelectedFilesArray] = useState([]);
  const [role, setRole] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    axios.get("/questions").then((response) => {
      setQuestions(response.data);
    });
  }, [questions]);

  const selectedQuestion = questions.filter((item) => item._id === id);
  const selectedQuestionIndex = questions.findIndex((item) => item._id === id);

  // const selectedQuestionID = selectedQuestion.map((item) => item._id);
  const selectedQn = selectedQuestion.map((item) => item.question);

  const handleQuestionChange = (e) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setQuestionType(e.target.value);
  };

  const handleSubmit = (id) => {
    //const formData = new FormData();
    // for (const key of Object.keys(selectedFile)) {
    //   data.append("selectedFiles", selectedFile[key]);
    // }

    // selectedFilesArray.map((file, index) => {
    //   data.append(`file${index}`, file);
    // });

    // for (let i = 0; i < selectedFile.length; i++) {
    //   console.log(selectedFile[i]);
    //   formData.append(selectedFile[i].name, selectedFile[i]);
    // }

    //data.append("firstname", "lastname");

    //data.append("files", selectedFilesArray[0], selectedFilesArray[0].name);
    // console.log(selectedFile);
    // console.log(formData);

    const qn = {
      id: id,
      question: question,
      questionType: questionType,
      mcqAnswers: inputList,
      formData: selectedFilesArray,
    };

    console.log(qn);
    // axios.post("/upload-files", data, {}).then((res) => {
    //   console.log(res.data);
    // });

    axios.post("/question/update", qn).then((response) => {
      console.log(response);
      setQuestion("");
    });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    inputList.length < 5 &&
      setInputList([...inputList, { answer: "", points: "" }]);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
    setSelectedFilesArray(Array.from(e.target.files));
  };

  const deleteQuestion = (id) => {
    const qn_id = { id: id };
    console.log(qn_id);
    axios.post("/questions/delete", qn_id).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="assessment__body">
      {selectedQuestionIndex === -1 ? (
        <div className="assessment__questionBody">
          <h1>Select a Question to edit.</h1>
        </div>
      ) : (
        <div className="assessment__questionBody">
          <div className="assessment__bodyContainer">
            <div className="assessment__bodyHeader">
              <div className="assessment__bodyHeaderComponent">
                Question {selectedQuestionIndex + 1} of {questions.length}{" "}
                <span>Write your question here ...</span>
              </div>
              <div>
                {selectedQuestion.map((item) => (
                  <DeleteOutlinedIcon
                    className="delbtn"
                    onClick={() => deleteQuestion(item._id)}
                  />
                ))}
              </div>
            </div>
            <div className="assessment__textArea">
              <textarea
                className="textarea"
                rows="10"
                cols="100"
                placeholder={selectedQn}
                value={question}
                onChange={handleQuestionChange}
              />
              <div className="uploaded-files">
                {selectedFilesArray.map((item) => (
                  <div className="uploaded-file">
                    <InsertDriveFileIcon />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
              <div className="assessment__textAreaOptions">
                <div className="characters__remaining">
                  1524 characters remaining
                </div>
                <div className="textArea__icons">
                  <div className="upload-input-container">
                    <input
                      accept="image/*"
                      id="icon-button-photo"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                    <label htmlFor="icon-button-photo">
                      <IconButton
                        className="upload-icon"
                        color="primary"
                        component="span"
                      >
                        <PhotoOutlinedIcon className="textArea__icon" />
                      </IconButton>
                    </label>
                  </div>

                  <div className="upload-input-container">
                    <input
                      accept="video/*"
                      id="icon-button-video"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                    <label htmlFor="icon-button-video">
                      <IconButton
                        className="upload-icon"
                        color="primary"
                        component="span"
                      >
                        <VideocamOutlinedIcon className="textArea__icon" />
                      </IconButton>
                    </label>
                  </div>

                  <div className="upload-input-container">
                    <input
                      accept="audio/*"
                      id="icon-button-audio"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                    <label htmlFor="icon-button-audio">
                      <IconButton
                        className="upload-icon"
                        color="primary"
                        component="span"
                      >
                        <MicNoneOutlinedIcon className="textArea__icon" />
                      </IconButton>
                    </label>
                  </div>

                  <div className="upload-input-container">
                    <input
                      accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                      id="icon-button-doc"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                    <label htmlFor="icon-button-doc">
                      <IconButton
                        className="upload-icon"
                        color="primary"
                        component="span"
                      >
                        <AssignmentOutlinedIcon className="textArea__icon" />
                      </IconButton>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <FormControl className="select-form">
              <InputLabel id="demo-controlled-open-select">
                Choose Question type
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                className="dropbtn"
                value={questionType}
                onChange={handleTypeChange}
              >
                <MenuItem value="Multiple Choice">
                  <div className="option-item">
                    <FormatListBulletedIcon />
                    Multiple Choice
                  </div>
                </MenuItem>
                <MenuItem value="Video">
                  <div className="option-item">
                    <VideocamOutlinedIcon />
                    Video
                  </div>
                </MenuItem>
                <MenuItem value="Audio">
                  <div className="option-item">
                    <MicNoneOutlinedIcon />
                    Audio
                  </div>
                </MenuItem>
                <MenuItem value="Text">
                  <div className="option-item">
                    <TitleIcon />
                    Text
                  </div>
                </MenuItem>
                <MenuItem value="Mcq with multiple answers">
                  <div className="option-item">
                    <FormatListBulletedIcon />
                    Multiple Choice with multiple answers
                  </div>
                </MenuItem>
                <MenuItem value="File">
                  <div className="option-item">
                    <InsertDriveFileIcon />
                    File
                  </div>
                </MenuItem>
              </Select>
            </FormControl>

            {questionType === "Multiple Choice" ? (
              <div>
                {inputList.map((x, i) => {
                  return (
                    <div className="box">
                      <div className="mcqInput">
                        <input
                          className=" mcq-input"
                          name="answer"
                          placeholder="Answer"
                          value={x.answer}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <input
                          className="mcq-input"
                          name="points"
                          placeholder="Points"
                          value={x.points}
                          onChange={(e) => handleInputChange(e, i)}
                        />

                        {inputList.length !== 1 && (
                          <div
                            className="cancelbtn"
                            onClick={() => handleRemoveClick(i)}
                          >
                            <CancelIcon />
                          </div>
                        )}
                      </div>
                      <div>
                        {inputList.length - 1 === i && (
                          <div className="inputbtn" onClick={handleAddClick}>
                            <AddIcon /> Add answer(5 max)
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
            ) : null}
            <div className="assessment__roleInputContainer">
              <label htmlFor="assessment-role-input">Enter the role : </label>
              <input
                type="text"
                id="assessment-role-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <label style={{marginLeft: "10px"}} htmlFor="assessment-role-input">Enter the tag : </label>
              <input
                type="text"
                
                id="assessment-role-input"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            {selectedQuestion.map((item) => (
              <div>
                <button
                  className="saveChanges"
                  onClick={() => handleSubmit(item._id)}
                >
                  Save Changes
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment__Body;

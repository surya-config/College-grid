import React, { useCallback, useEffect, useState } from "react";
import "./StudentAssessmentBody.css";
import axios from "./axios";

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
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import { answerChoices } from "./answer";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import clsx from "clsx";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

import ReactPlayer from "react-player";
import MicRecorder from "mic-recorder-to-mp3";
import { ReactMic } from "react-mic";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
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

const checkBoxStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function Assessment__Body({ qn, qnsLen, qnIndex }) {
  const classes = checkBoxStyles();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Choose Question type");

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilesArray, setSelectedFilesArray] = useState([]);
  const [value, setValue] = useState("");

  const [videoFilePath, setVideoFileURL] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");
  const [record, setRecord] = useState(false);
  const [audio, setAudio] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const { id } = useParams();

  console.log(selectedFilesArray);

  useEffect(() => {
    axios.get("/questions-list").then((response) => {
      setQuestions(response.data);
    });
  }, [questions]);

  useEffect(() => {
    console.log("checkedItems: ", checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    console.log("checkedItems: ", selectedFile);
  }, [selectedFilesArray]);

  const selectedRole = questions.filter((item) => item._id === id);
  const questionsList = selectedRole.map((item) => item.questionsArray);
  const qnsLength = selectedRole[0]?.questionsArray.length;
  const firstQuestion = questionsList.map((item) => item[0]);

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleQuestionChange = (e) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setQuestionType(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
    setSelectedFilesArray(Array.from(e.target.files));
    console.log(e.target.files);
  };

  const addFiles = (e) => {
    setSelectedFile(e.target.files);
    setSelectedFilesArray(Array.from(e.target.files));
  };

  const handleVideoUpload = (event) => {
    setVideoFileURL(URL.createObjectURL(event.target.files[0]));
  };
  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    const url = URL.createObjectURL(recordedBlob.blob);
    setAudio(url);
  };

  const renderSwitch = (question_type) => {
    switch (question_type) {
      case "Video":
        return (
          <div className="videoUploadContainer">
            {videoFilePath ? (
              <ReactPlayer
                url={videoFilePath}
                width="648px"
                height="300px"
                controls={true}
              />
            ) : (
              <div>
                <input
                  type="file"
                  accept="video/*"
                  id="assessment-video-upload-btn"
                  className="studentAssessment__fileUploadLink"
                  onChange={handleVideoUpload}
                  hidden
                />
                <button className="studentAssessment__audioUploadBtn">
                  <label
                    htmlFor="assessment-video-upload-btn"
                    className="assessment-video-upload-btn-label"
                  >
                    Upload Video{" "}
                    <PublishRoundedIcon className="assessment-video-upload-icon" />
                  </label>
                </button>
              </div>
            )}
          </div>
        );
      case "Audio":
        return (
          <div className="videoUploadContainer">
            {audio ? (
              <div className="post__audioRecordings">
                <audio src={audio} controls="controls" />
                <button
                  className="post__audioRecordings-rerecord"
                  onClick={() => setAudio(null)}
                >
                  Re-record
                </button>
              </div>
            ) : (
              <div className="audio-recorder">
                <ReactMic
                  record={record}
                  className="sound-wave"
                  onStop={onStop}
                  onData={onData}
                  strokeColor="#000000"
                  backgroundColor="#ededed"
                />
                {record ? (
                  <button
                    className="audio-recorder-button2"
                    onClick={() => setRecord(!record)}
                    type="button"
                  >
                    Stop Recording
                  </button>
                ) : (
                  <button
                    className="audio-recorder-button1"
                    onClick={() => setRecord(!record)}
                    type="button"
                  >
                    Start Recording{" "}
                  </button>
                )}
                {/* <button
                  className="audio-recorder-button2"
                  onClick={() => setRecord(false)}
                  type="button"
                >
                  Stop Recording
                </button> */}
              </div>
            )}
          </div>
        );
      case "Mcq with multiple answers":
        return (
          <div className="checkbox-container">
            {qn[3].map((item) => (
              <label key={item.key} className="checkbox-items">
                <Checkbox
                  name={item}
                  checked={checkedItems[item]}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}
          </div>
        );
      case "Multiple Choice":
        return (
          <div className="radio">
            {qn[3].map((res) => (
              <FormControl component="fieldset">
                <RadioGroup
                  defaultValue=""
                  aria-label=""
                  name="customized-radios"
                  className="radioOption"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={res}
                    control={<StyledRadio />}
                    label={res}
                  />
                </RadioGroup>
              </FormControl>
            ))}
          </div>
        );
      case "Text":
        return (
          <div className="questionType__textarea">
            <textarea
              className="student__textarea"
              rows="8"
              cols="100"
              placeholder="Type your answer here..."
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
        );
      case "File":
        return (
          <div>
            {selectedFile === null ? (
              <div className="fileUploadContainer">
                <CloudUploadOutlinedIcon />
                <h3>Drag & drop your file here</h3>
                <input
                  type="file"
                  accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                  id="assessment-file-upload-btn"
                  className="studentAssessment__fileUploadLink"
                  onChange={handleFileChange}
                  hidden
                  multiple
                />
                <label
                  htmlFor="assessment-file-upload-btn"
                  className="assessment-file-upload-btn-label"
                >
                  or browse files
                </label>
                <h5>FILE SIZE MUST BE 60MB OR LESS</h5>
              </div>
            ) : (
              <div className="post__fileUploadContainer">
                <div className="post__uploaded-files">
                  <div className="post__uploaded-file">
                    <CheckCircleIcon />
                    {selectedFilesArray?.map((item) => (
                      <p>
                        <span>{item.name}</span> has been successfully uploaded
                      </p>
                    ))}
                    <input
                      type="file"
                      accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                      id="assessment-file-upload-btn"
                      className="studentAssessment__fileUploadLink"
                      onChange={addFiles}
                      hidden
                    />
                    <label
                      htmlFor="assessment-file-upload-btn"
                      className="assessment-file-post-upload-btn-label"
                    >
                      Replace file?
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {qn[1] ? (
        <div className="studentAssessment__questionBody">
          <div className="studentAssessment__bodyContainer">
            <div className="studentAssessment__bodyHeader">
              Question {qnIndex} of {qnsLen}{" "}
            </div>
            <div className="studentAssessment__question">{qn[1]}</div>
            <div className="studentAssessment__questionType">
              {renderSwitch(qn[2])}
            </div>

            {qn[1] && (
              <div className="studentAssessment__questionSubmission">
                {/* {videoFilePath ? (
                  <button
                    className="post__audioRecordings-rerecord"
                    onClick={() => setVideoFileURL(null)}
                  >
                    Re-record
                  </button>
                ) : null} */}
                <button
                  className="studentAssessment__questionBackbtn"
                  // onClick={() => handleSubmit(item._id)}
                >
                  Back
                </button>
                <button
                  className="studentAssessment__questionSavebtn"
                  // onClick={() => handleSubmit(item._id)}
                >
                  Save and Continue
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="studentAssessment__questionBody">
          {firstQuestion.map((item) => (
            <div className="studentAssessment__bodyContainer">
              <div className="studentAssessment__bodyHeader">
                Question 1 of {qnsLength}
              </div>
              {qn[1] ? null : (
                <div className="studentAssessment__question">{item[1]}</div>
              )}
              <div className="studentAssessment__questionType">
                {renderSwitch(item[2])}
              </div>
              <div className="studentAssessment__questionSubmission">
                <button
                  className="studentAssessment__questionBackbtn"
                  // onClick={() => handleSubmit(item._id)}
                >
                  Back
                </button>
                <button
                  className="studentAssessment__questionSavebtn"
                  // onClick={() => handleSubmit(item._id)}
                >
                  Save and Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Assessment__Body;

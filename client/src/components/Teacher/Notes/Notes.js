import React, { useRef, useState } from "react";
import TMainCard from "./MainCard/MainCard";
import "./Notes.css";

import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import fileUpload from "../../../fileUpload";

import Dropzone from "react-dropzone";
import axios from "../../../axios";

function TNotes() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage

  const [course, setCourse] = useState("");
  const [subcode, setSubcode] = useState("");
  const [semester, setSemester] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const removePopup = () => {
    let elem = document.querySelector(".tnotes__popup");
    elem.classList.add("tnotes__is-hidden");
  };

  const addPopup = () => {
    let elem = document.querySelector(".tnotes__popup");
    elem.classList.add("fadeInclass");
    elem.classList.remove("tnotes__is-hidden");
    window.scrollTo(0, 0);
    // disableScroll.on();
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      if (course.trim() !== "" && subcode.trim() !== "" && semester !== 0) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("course", course);
          formData.append("subcode", subcode);
          formData.append("semester", semester);

          setErrorMsg("");
          await axios
            .post(`/api/notes/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              removePopup();
              return <h1>File uploaded successfully</h1>;
            });
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="tnotes">
      <div className="tnotes__container">
        <div className="tnotes__popup tnotes__is-hidden ">
          <div className="tnotes__popup__wrap">
            <div className="tnotes__popup__content">
              <div className="tnotes__popup__contentBanner ">
                <CancelIcon className="popup__closeBtn" onClick={removePopup} />
              </div>

              <form onSubmit={handleOnSubmit}>
                <div className="tnotes__popupContentContainer">
                  <div className="tnotes__popupContentContainer__firstContainer">
                    <div className="tnotes__input">
                      <label className="input__label input__label--required">
                        Enter the course name
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Operating System"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                      />
                    </div>
                    <div className="tnotes__input">
                      <label className="input__label input__label--required">
                        Enter the subject code
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 17CS664"
                        value={subcode}
                        onChange={(e) => setSubcode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="tnotes__input">
                      <label className="input__label input__label--required">
                        Enter the semester
                      </label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                      >
                        <option value="">Please select </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                    </div>
                  </div>
                  <div className="tnotes__popupContentContainer__secondContainer">
                    <div className="tnotes__fileuploadContainer">
                      <Dropzone
                        className="tnotes__dropzone"
                        onDrop={onDrop}
                        onDragEnter={() => updateBorder("over")}
                        onDragLeave={() => updateBorder("leave")}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps({ className: "drop-zone" })}
                            ref={dropRef}
                          >
                            <input {...getInputProps()} />
                            <p>
                              Drag and drop a file OR{" "}
                              <span
                                style={{
                                  color: "#129eaf",
                                  cursor: "pointer",
                                }}
                              >
                                click here
                              </span>{" "}
                              to select a file
                            </p>
                            {file && (
                              <div>
                                <strong>Selected file:</strong> {file.name}
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                      {previewSrc ? (
                        isPreviewAvailable ? (
                          <div className="image-preview">
                            <img
                              className="preview-image"
                              src={previewSrc}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <div className="preview-message">
                            <p>No preview available for this file</p>
                          </div>
                        )
                      ) : (
                        <div className="preview-message">
                          <p>
                            Image preview will be shown below after selection
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="tnotes__submitButton" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </div>
          </div>
        </div>
        <div className="tnotes__createNotes">
          <button className="tnotes__createButton" onClick={addPopup}>
            <AddIcon />
            Create
          </button>
        </div>
        <div className="tnotes__list">
          <TMainCard
            course="Python - 17CS664 - 2020"
            semester="6"
            name="Nagraj A"
          />
        </div>
      </div>
    </div>
  );
}

export default TNotes;

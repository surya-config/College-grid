import React, { useEffect, useState } from "react";
import "./SNotes.css";
import axios from "../../../axios";

import { connect } from "react-redux";
import download from "downloadjs";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function SNotes() {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(0);

  console.log(selectedSemester);

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`/api/notes/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, [selectedSemester]);

  const downloadFile = async (_id, file_path, file_mimetype) => {
    try {
      await axios
        .get(`/api/notes/download/${_id}`, {
          responseType: "blob",
        })
        .then((res) => {
          const split = file_path.split("/");
          const filename = split[split.length - 1];
          setErrorMsg("");
          return download(res.data, filename, file_mimetype);
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div className="notes">
      <div className="notes__container">
        <div className="notes__semesterSelection">
          <label htmlFor="semesterSelection">Select the semester: </label>
          <select
            className="semesterSelection"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
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

        <div className="smainCard__cardSection">
          {filesList.length > 0 ? (
            filesList.map(
              ({
                _id,
                course,
                subcode,
                semester,
                email,
                name,
                file_path,
                file_mimetype,
              }) =>
                selectedSemester === 0 || selectedSemester == semester ? (
                  <div className="smainCard__card" key={_id}>
                    <div className="smainCard__cardContent">
                      <AssignmentOutlinedIcon />
                      <h3>{course}</h3>
                      <h6>{subcode}</h6>
                      <p>{file_path.replace(/^.*[\\\/]/, "")}</p>
                    </div>
                    <div className="smainCard__cardDownload">
                      <a
                        href="#/"
                        onClick={() =>
                          downloadFile(_id, file_path, file_mimetype)
                        }
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ) : (
                  null
                )
            )
          ) : (
            <h5>There are no Notes uploaded</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(SNotes);

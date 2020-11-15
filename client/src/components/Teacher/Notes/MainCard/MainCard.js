import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "../../../../axios";

import "./MainCard.css";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function TMainCard({ auth }) {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
  }, []);

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
    <div className="tmainCard">
      <div className="tmainCard__filesContainer">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div className="tmainCard__cardSection">
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
                email === auth.user.email && (
                  <div className="tmainCard__card" key={_id}>
                    <div className="tmainCard__cardContent">
                      <AssignmentOutlinedIcon />
                      <h3>{course}</h3>
                      <h6>{subcode}</h6>
                      <p>{file_path.replace(/^.*[\\\/]/, "")}</p>
                    </div>
                    <div className="tmainCard__cardDownload">
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
                )
            )
          ) : (
            <h5>No files found. Please add some.</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(TMainCard);

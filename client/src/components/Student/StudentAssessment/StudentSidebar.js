import React, { useEffect, useState } from "react";
import "./StudentSidebar.css";
import axios from "./axios";
import { Link, useParams } from "react-router-dom";

function StudentSidebar({ setQn, setQnIndex, setQnLen, setRole }) {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get("/questions-list").then((response) => {
      setQuestions(response.data);
    });
  }, [questions]);

  // const handleActiveItem = (id, qn) => {
  //   let elem = document.querySelector(".studentSidebarQuestion");
  //   {
  //     selectedRole.map((item) =>
  //       item.questionsArray.map((i) => {
  //         if (qn[2] === i[2]) {
  //           console.log(qn[2], i[2]);
  //           elem.classList.add("activeItem");
  //         }
  //       })
  //     );
  //   }
  //   setQn(qn);
  // };

  const selectedRole = questions.filter((item) => item._id === id);
  const qnsLen = selectedRole[0]?.questionsArray.length;

  const handleClick = (qn, index, qnsLen) => {
    setQn(qn);
    setQnIndex(index + 1);
    setQnLen(qnsLen);
    setRole(selectedRole);
  };

  return (
    <div className="studentSidebar">
      <div className="studentSidebarContainer">
        <div className="indexing">
          {selectedRole.map((item) =>
            item.questionsArray.map((qn, index) => (
              <div
                className="studentSidebarQuestion"
                key={index}
                // onClick={() => handleActiveItem(qn[2], qn)}
                onClick={() => handleClick(qn, index, qnsLen)}
              >
                <div className="sidebar__qn">Q{index + 1}</div>
                <p>{qn[1]}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;

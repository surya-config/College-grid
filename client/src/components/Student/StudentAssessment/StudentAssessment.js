import React, { useEffect, useState } from "react";
import "./StudentAssessment.css";
import StudentAssessmentBody from "./StudentAssessmentBody";
import StudentSidebar from "./StudentSidebar";

import disableScroll from "disable-scroll";

function StudentAssessment() {
  const [qn, setQn] = useState([]);
  const [qnLen, setQnLen] = useState(0);
  const [qnIndex, setQnIndex] = useState(0);
  const [role, setRole] = useState(null);
  const [showQns, setShowQns] = useState(false);

  const removePopup = () => {
    let elem = document.querySelector(".assessment__popup");
    elem.classList.add("assessment__is-hidden");
    disableScroll.off();
  };
  const addPopup = () => {
    let elem = document.querySelector(".assessment__popup");
    elem.classList.add("fadeInclass");
    elem.classList.remove("assessment__is-hidden");
    window.scrollTo(0, 0);
    disableScroll.on();
  };

  return (
    <div className="studentAssessment">
      {showQns ? (
        <div>
          <div className="assessment__popup is-hidden ">
            <div className="assessment__popup__wrap">
              <div className="assessment__popup__content">
                <p className="assessment__popup__para">
                  Your deadline to submit this interview is October 10th 2020 at
                  1:30pm IST. All of your answers have been saved.
                </p>
                <div className="assessment__popup__buttons">
                  <button
                    className="assessment__popup__button"
                    onClick={removePopup}
                  >
                    Complete Later
                  </button>
                  <button
                    className="assessment__popup__button"
                    onClick={removePopup}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="studentAssessment__header">
            <div className="studentAssessment__headerName"></div>
            <div className="studentAssessment__headerOptions">
              <div className="studentAssessment__submitOptions">
                <button
                  className="studentAssessment__submitOption"
                  onClick={addPopup}
                >
                  <span>Complete Later</span>
                </button>
                <button className="studentAssessment__submitOption">
                  <span>Submit </span>
                </button>
              </div>
            </div>
          </div>
          <div className="studentAssessment__body">
            <StudentSidebar
              setQn={setQn}
              setQnIndex={setQnIndex}
              setQnLen={setQnLen}
              setRole={setRole}
            />
            <StudentAssessmentBody qn={qn} qnsLen={qnLen} qnIndex={qnIndex} />
          </div>
        </div>
      ) : (
        <div className="startAssessmentBody">
          <div className="startAssessmentContainer">
            <h1>Software Developer</h1>
            <h3>OCTOBER 16TH 2020</h3>
            <p>
              Thank you for your interest in a position at{" "}
              <span>Scholarly Science</span>. To assess your skills for this
              role, we request that you complete an online interview.
            </p>
            <p>
              This interview includes job-related questions that may be answered
              in a variety of ways (e.g., video, audio, text). It's an
              opportunity to demonstrate how you would handle real-world
              scenarios in this role. Feel free to complete this interview at
              home at a time that works for you.
            </p>
            <p>We look forward to seeing your answers!</p>
            <p>
              - The <span>Scholarly Science</span> Team
            </p>
            <button
              className="startAssessmentButton"
              onClick={() => setShowQns(true)}
            >
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentAssessment;

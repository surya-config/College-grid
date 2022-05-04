
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });

function MainAssessmentPage({ auth }) {
    const history = useHistory();
    const [quizName, setQuizName] = useState("");
    const [semester, setSemester] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [listOfQuizes,setListOfQuizes] = useState([])


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

      const handleSubmit = () => {
          let details = {
              quizName,
              semester,
              email:auth.user.email
          }
        history.push("/teacher/dashboard/assessment/quiz", details)
       
      }
    

    return (
        <div>
        <div className="tnotes__popup tnotes__is-hidden ">
          <div className="tnotes__popup__wrap">
            <div className="tnotes__popup__content">
              <div className="tnotes__popup__contentBanner ">
                <CancelIcon className="popup__closeBtn" onClick={removePopup} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="tnotes__popupContentContainer">
                  <div className="tnotes__popupContentContainer__firstContainer">
                    <div className="tnotes__input">
                      <label className="input__label input__label--required">
                        Enter the quiz name
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Operating System"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
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
                 

                  <button className="tnotes__submitButton" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </div>
          </div>
        </div>
            
            <button className="tnotes__createButton" onClick={addPopup}>
              <AddIcon />
              Add Quiz
            </button>
        </div>
    )
}

export default connect(mapStateToProps)(MainAssessmentPage)

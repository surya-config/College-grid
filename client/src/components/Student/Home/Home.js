import React from "react";
import { connect } from "react-redux";
import "./Home.css";

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

function Home({auth}) {
  return (
    <div className="home">
     <img className="home__img1" src="https://image.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg"
     alt="" />  
     <h1>Welcome {auth.user.name}!</h1>
    <img className="home__img2" src="https://image.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg"
    alt="" />  
    </div>
  );
}

export default connect(mapStateToProps)(Home);

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { NewSubjectContext } from "../Context/NewSubjectContext";
import { getAuth,signOut } from "firebase/auth";
import SubjectItem from "./SubjectItem";

const SubjectNav = ({ student }) => {
  const navigate = useNavigate();
  const { currentUser, dispatch } = useContext(AuthContext);
  const { newSubject } = useContext(NewSubjectContext);
  const [updatedSubjectsList, setUpdatedSubjectsList] = useState(
    student.subjects
  );

  const handleLogout = async () => {
    try {
      // console.log(currentUser.auth)
      const auth = getAuth();
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };
  
  useEffect(() => {
    if (newSubject) {
      console.log("New subject added:", newSubject);
      setUpdatedSubjectsList((prevSubjects) => [...prevSubjects, newSubject]);
    }
  }, [newSubject]);

  return (
    <div className="md:w-4/7">
      <div>
        <h2>Subjects</h2>
        <ul>
          <SubjectItem subjects={updatedSubjectsList} setUpdatedSubjectsList={setUpdatedSubjectsList} />
        </ul>
        <div>
          <span>{student.name}</span>
          <button
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectNav;

import React, { useState, useContext } from "react";
import AddSubjectModal from "./AddSubjectModal";
import { AuthContext } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const SubjectItem = ({ subjects, setUpdatedSubjectsList }) => {
  // Added setSubjects prop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleAddSubjectClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle deletion of a subject
  const handleDeleteSubject = async (subjectName) => {
    // Find the subject to delete
    const subjectToDelete = subjects.find(
      (subject) => subject.name === subjectName
    );

    if (subjectToDelete) {
      try {
        // Get the logged-in user's document ID
        const userId = currentUser.uid;
        const docRef = doc(db, "students", userId);

        // Delete the subject from the subjects array using arrayRemove
        await updateDoc(docRef, {
          subjects: arrayRemove(subjectToDelete),
        });

        // Update the subjects list in the parent component
        setUpdatedSubjectsList((prevSubjects) =>
          prevSubjects.filter((subject) => subject.name !== subjectName)
        );

        console.log("Subject deleted successfully from Firebase.");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting subject from Firebase:", error);
      }
    }
  };

  return (
    <div>
      <h2>
        {subjects.map((subject, index) => (
          <div key={index}>
            <span>{subject.name}</span>
            <button onClick={() => handleDeleteSubject(subject.name)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </h2>
      <button onClick={handleAddSubjectClick}>Add Subject</button>
      <AddSubjectModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SubjectItem;

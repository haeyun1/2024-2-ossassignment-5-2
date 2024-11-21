import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const BASE_URL = "https://672c66621600dda5a9f84bfc.mockapi.io/user";

function AddStudentModal({ show, handleClose, refreshStudents }) {
  const [student, setStudent] = useState({
    name: "",
    birth: "",
    gender: "Male",
    major1: "",
    major2: "",
  });

  const nameRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!nameRef.current.value) {
      alert("이름을 입력해 주세요.");
      nameRef.current.focus();
      return;
    }

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      handleClose();
      refreshStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>학생 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleAddStudent}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              ref={nameRef}
              value={student.name}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* 생년월일, 성별, 전공 입력 필드 */}
          <Button type="submit" variant="primary">
            추가
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddStudentModal;

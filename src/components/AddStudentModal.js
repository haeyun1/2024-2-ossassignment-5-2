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
          {/* 이름 입력 */}
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
          {/* 성별 입력 */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              성별
            </label>
            <select
              className="form-select"
              id="gender"
              value={student.gender}
              onChange={handleInputChange}
              required
            >
              <option value="Male">남성</option>
              <option value="Female">여성</option>
              <option value="Other">기타</option>
            </select>
          </div>
          {/* 생일 입력 */}
          <div className="mb-3">
            <label htmlFor="birth" className="form-label">
              생일
            </label>
            <input
              type="date"
              className="form-control"
              id="birth"
              value={student.birth}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* 전공1 입력 */}
          <div className="mb-3">
            <label htmlFor="major1" className="form-label">
              전공1
            </label>
            <input
              type="text"
              className="form-control"
              id="major1"
              value={student.major1}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* 전공2 입력 */}
          <div className="mb-3">
            <label htmlFor="major2" className="form-label">
              전공2
            </label>
            <input
              type="text"
              className="form-control"
              id="major2"
              value={student.major2}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" variant="primary">
            추가
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddStudentModal;

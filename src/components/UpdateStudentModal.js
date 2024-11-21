import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const BASE_URL = "https://672c66621600dda5a9f84bfc.mockapi.io/user";

function UpdateStudentModal({ show, handleClose, refreshStudents }) {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    birth: "",
    gender: "Male",
    major1: "",
    major2: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      handleClose();
      refreshStudents(); // 학생 목록 새로고침
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>학생 업데이트</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdateStudent}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              value={student.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={student.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birth" className="form-label">
              생년월일
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
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="major1" className="form-label">
              전공 1
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
          <div className="mb-3">
            <label htmlFor="major2" className="form-label">
              전공 2
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
            업데이트
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateStudentModal;

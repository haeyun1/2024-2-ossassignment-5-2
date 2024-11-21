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

  const handleInputChange = async (e) => {
    const { id, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [id]: value }));

    if (student.id) {
      try {
        await fetch(`${BASE_URL}/${student.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...student, [id]: value }),
        });
        refreshStudents();
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>학생 업데이트</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
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
          {/* 나머지 입력 필드 */}
          <Button type="button" variant="primary" onClick={handleClose}>
            완료
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateStudentModal;

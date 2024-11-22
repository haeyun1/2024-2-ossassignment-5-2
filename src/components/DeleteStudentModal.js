import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://672c66621600dda5a9f84bfc.mockapi.io/user";

function DeleteStudentModal({ show, handleClose, refreshStudents }) {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const handleDeleteStudent = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/${studentId}`, {
        method: "DELETE",
      });
      navigate("/"); // 기본 화면으로 이동
      refreshStudents(); // 학생 목록 새로고침
      handleClose(); // 모달 닫기
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleModalClose = () => {
    navigate("/"); // 기본 화면으로 이동
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>학생 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleDeleteStudent}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">
              삭제할 학생의 ID 입력
            </label>
            <input
              type="text"
              className="form-control"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="danger">
            삭제
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteStudentModal;

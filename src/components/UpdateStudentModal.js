import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [changeCount, setChangeCount] = useState(0); // 변경 횟수 추적
  const navigate = useNavigate();

  // useRef를 사용한 ID 필드 참조
  const idRef = useRef(null);

  useEffect(() => {
    if (!show) {
      setStudent({
        id: "",
        name: "",
        birth: "",
        gender: "Male",
        major1: "",
        major2: "",
      });
      setChangeCount(0);
    }
  }, [show]);

  // 입력 필드 변경 핸들러
  // 입력 필드 변경 핸들러
  const handleInputChange = async (e) => {
    const { id, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [id]: value }));

    // 변경 횟수는 ID 필드를 제외하고 증가
    if (id !== "id") {
      setChangeCount((prevCount) => prevCount + 1);

      // 서버에 변경 사항 반영
      if (student.id) {
        try {
          await fetch(`${BASE_URL}/${student.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...student, [id]: value }),
          });
        } catch (error) {
          console.error("Error updating student:", error);
        }
      }
    }
  };

  // 학생 정보 가져오기
  const handleFetchStudent = async (e) => {
    e.preventDefault();
    if (!idRef.current.value) {
      alert("학생 ID를 입력해 주세요.");
      idRef.current.focus();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${student.id}`);
      if (!response.ok) {
        throw new Error("학생을 찾을 수 없습니다.");
      }
      const data = await response.json();
      setStudent(data); // 학생 정보를 상태에 설정
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    navigate("/"); // 기본 화면으로 이동
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>학생 업데이트</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {/* 변경 횟수 표시 */}
          <div className="mb-3">
            <strong>총 변경 횟수: {changeCount}</strong>
          </div>

          {/* ID 입력 필드 */}
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              ref={idRef}
              value={student.id}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={handleFetchStudent}
              disabled={loading}
            >
              {loading ? "불러오는 중..." : "학생 정보 불러오기"}
            </Button>
          </div>

          {/* 이름 입력 필드 */}
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

          {/* 생일 입력 필드 */}
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

          {/* 성별 선택 필드 */}
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

          {/* 전공1 입력 필드 */}
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

          {/* 전공2 입력 필드 */}
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateStudentModal;

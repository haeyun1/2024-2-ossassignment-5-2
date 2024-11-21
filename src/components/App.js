import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShowList from "./components/ShowList";
import AddStudentModal from "./components/AddStudentModal";
import UpdateStudentModal from "./components/UpdateStudentModal";
import DeleteStudentModal from "./components/DeleteStudentModal";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>학생 관리 시스템</h1>
        <div className="mb-4">
          <Link to="/add">
            <button className="btn btn-primary me-2">학생 추가</button>
          </Link>
          <Link to="/update">
            <button className="btn btn-secondary me-2">학생 업데이트</button>
          </Link>
          <Link to="/delete">
            <button className="btn btn-danger">학생 삭제</button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/list" element={<ShowList />} />
          <Route path="/add" element={<AddStudentModal show={true} />} />
          <Route path="/update" element={<UpdateStudentModal show={true} />} />
          <Route path="/delete" element={<DeleteStudentModal show={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

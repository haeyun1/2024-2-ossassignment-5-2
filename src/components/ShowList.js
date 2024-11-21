import React, { useEffect, useState } from "react";

const BASE_URL = "https://672c66621600dda5a9f84bfc.mockapi.io/user";

function ShowList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="mt-4">
      {students.map((student) => (
        <div key={student.id} className="student-item">
          <strong>ID:</strong> {student.id} <br />
          <strong>이름:</strong> {student.name} <br />
          <strong>생년월일:</strong> {student.birth} <br />
          <strong>성별:</strong> {student.gender} <br />
          <strong>전공 1:</strong> {student.major1} <br />
          <strong>전공 2:</strong> {student.major2} <br />
        </div>
      ))}
    </div>
  );
}

export default ShowList;

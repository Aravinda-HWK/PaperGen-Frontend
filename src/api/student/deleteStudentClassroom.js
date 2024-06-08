import baseURL from 'src/config/config';

export default async function deleteStudentClassroom(classroomID, studentID) {
  const response = await fetch(`${baseURL}/classroom/delete-student`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ classroomID: classroomID, studentID: studentID }),
  });
  const data = await response.json();

  return data;
}

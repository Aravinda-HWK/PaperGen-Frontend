import baseURL from 'src/config/config';

const getStudentForTeacher = async (id) => {
  const response = await fetch(`${baseURL}/student/allStudentsForTeacher?teacherID=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getStudentForTeacher;

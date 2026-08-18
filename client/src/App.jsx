import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  
  const API_URL = 'https://curly-doodle-977xwwjqvx46hp5rr-5000.app.github.dev';

  const fetchStudents = () => {
    fetch(`${API_URL}/api/students`).then(res => res.json()).then(data => setStudents(data));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CÂU 49: HÀM GỬI DỮ LIỆU BẰNG POST
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      alert("Thêm thành công!");
      fetchStudents(); // Cập nhật lại danh sách ngay lập tức
      setFormData({ studentId: '', name: '', email: '' }); // Xóa trắng form
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>
      
      {/* Gắn hàm handleSubmit vào sự kiện onSubmit */}
      <form onSubmit={handleSubmit}>
        <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="MSSV" required />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Họ tên" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      <h2>Danh sách</h2>
      <ul>
        {students.map(sv => <li key={sv._id}>{sv.studentId} - {sv.name} - {sv.email}</li>)}
      </ul>
    </div>
  );
}
export default App;
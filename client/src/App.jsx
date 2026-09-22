import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  
  const API_URL = import.meta.env.VITE_API_URL;

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

  // Hàm xử lý Xóa
const handleDelete = (id) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE' })
      .then(() => {
        alert("Đã xóa sinh viên!");
        fetchStudents(); // Cập nhật lại danh sách
      })
      .catch(err => console.error(err));
  }
};

// Hàm xử lý Cập nhật (Sửa nhanh bằng prompt cho đơn giản)
const handleUpdate = (id, currentEmail) => {
  const newEmail = prompt("Nhập Email mới:", currentEmail);
  if (newEmail) {
    fetch(`${API_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail })
    })
    .then(() => {
      alert("Cập nhật thành công!");
      fetchStudents();
    })
    .catch(err => console.error(err));
  }
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
  {students.map(sv => (
    <li key={sv._id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
      <span style={{ flexGrow: 1, color: '#333' }}>
        <strong>{sv.studentId}</strong> - {sv.name} - {sv.email}
      </span>
      <button 
        onClick={() => handleUpdate(sv._id, sv.email)} 
        style={{ 
          marginLeft: '10px', 
          padding: '5px 15px', 
          backgroundColor: '#0d6efd', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
        Sửa
      </button>
      <button 
        onClick={() => handleDelete(sv._id)} 
        style={{ 
          marginLeft: '5px', 
          padding: '5px 15px', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
        Xóa
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}
export default App;
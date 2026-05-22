import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_id: "",
    role: "Student",
    name: "",
    email: "",
    password: "",
    ph_number: "",
    nationality: "",
    department: "",
    major: "",
    enrollment_year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>NSA Website Registration</h2>

      <form onSubmit={handleRegister} className="mt-4" style={{ maxWidth: "600px" }}>
        <input className="form-control mb-3" name="student_id" placeholder="Student ID" onChange={handleChange} required />
        <input className="form-control mb-3" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-3" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-3" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input className="form-control mb-3" name="ph_number" placeholder="Phone Number" onChange={handleChange} />
        <input className="form-control mb-3" name="nationality" placeholder="Nationality" onChange={handleChange} />
        <input className="form-control mb-3" name="department" placeholder="Department" onChange={handleChange} />
        <input className="form-control mb-3" name="major" placeholder="Major" onChange={handleChange} />
        <input className="form-control mb-3" name="enrollment_year" type="number" placeholder="Enrollment Year" onChange={handleChange} />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
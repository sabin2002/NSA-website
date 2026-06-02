import { useEffect, useState } from "react";
import API from "../api/axios";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: getAuthHeader(),
      });
      setUsers(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(
        `/users/${userId}/role`,
        { role: newRole },
        { headers: getAuthHeader() }
      );

      alert("User role updated successfully");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/users/${userId}`, {
        headers: getAuthHeader(),
      });

      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.student_id} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h1>User Management</h1>
        <p>View users, search accounts, update roles, and delete users.</p>
      </div>

      <div className="users-card">
        <div className="users-topbar">
          <h2>All Users</h2>

          <input
            type="text"
            placeholder="Search by name, email, student ID, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Nationality</th>
              <th>Department</th>
              <th>Major</th>
              <th>Year</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="10">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.student_id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.nationality}</td>
                  <td>{user.department}</td>
                  <td>{user.major}</td>
                  <td>{user.enrollment_year}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.user_id, e.target.value)
                      }
                    >
                      <option value="student">student</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
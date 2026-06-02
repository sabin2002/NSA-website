import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Budget.css";

function Budget() {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    description: "",
  });

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchBudgets = async () => {
    try {
      const res = await API.get("/budget");
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/budget/${editingId}`, formData, {
          headers: getAuthHeader(),
        });

        alert("Budget record updated successfully");
      } else {
        await API.post("/budget", formData, {
          headers: getAuthHeader(),
        });

        alert("Budget record created successfully");
      }

      setFormData({
        title: "",
        amount: "",
        type: "income",
        description: "",
      });

      setEditingId(null);
      fetchBudgets();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.budget_id);

    setFormData({
      title: record.title,
      amount: record.amount,
      type: record.type,
      description: record.description,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget record?")) return;

    try {
      await API.delete(`/budget/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Budget record deleted successfully");
      fetchBudgets();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const totalIncome = records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const totalExpense = records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="budget-page">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Manage NSA income and expenses.</p>
      </div>

      <div className="budget-summary">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p>₩ {totalIncome.toLocaleString()}</p>
        </div>

        <div className="summary-card expense">
          <h3>Total Expense</h3>
          <p>₩ {totalExpense.toLocaleString()}</p>
        </div>

        <div className="summary-card balance">
          <h3>Current Balance</h3>
          <p>₩ {balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="budget-container">
        <div className="budget-form-card">
          <h2>{editingId ? "Edit Record" : "Add Budget Record"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <textarea
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <button type="submit">
              {editingId ? "Update Record" : "Add Record"}
            </button>
          </form>
        </div>

        <div className="budget-table-card">
          <h2>Budget Records</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6">No records found</td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.budget_id}>
                    <td>{record.budget_id}</td>
                    <td>{record.title}</td>
                    <td>₩ {Number(record.amount).toLocaleString()}</td>
                    <td>{record.type}</td>
                    <td>{record.description}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(record.budget_id)}
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
    </div>
  );
}

export default Budget;
import React, { useState, useEffect } from "react";
import "../styles/Expenses.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showExpenseTable, setShowExpenseTable] = useState(false);

  const [payments, setPayments] = useState([]);
  const [showPaymentTable, setShowPaymentTable] = useState(false);

  const [expenseData, setExpenseData] = useState({
    date: "",
    category: "",
    tax: "",
    note: "",
    vendor: "",
  });

  const [paymentData, setPaymentData] = useState({
    customer: "",
    date: "",
    amount: "",
    paymentMethod: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];

    setExpenses(storedExpenses);
    setPayments(storedPayments);

    setShowExpenseTable(storedExpenses.length > 0);
    setShowPaymentTable(storedPayments.length > 0);
  }, []);

  // Handle input changes for expenses
  const handleExpenseChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  // Handle input changes for payments
  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  // Submit Expense
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const updatedExpenses = [...expenses, expenseData];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setShowExpenseTable(true);
    setShowExpenseForm(false);
    setExpenseData({ date: "", category: "", tax: "", note: "", vendor: "" });
  };

  // Submit Payment
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const updatedPayments = [...payments, paymentData];
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    setShowPaymentTable(true);
    setPaymentData({ customer: "", date: "", amount: "", paymentMethod: "" });
  };

  // Delete Expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    if (updatedExpenses.length === 0) setShowExpenseTable(false);
  };

  // Delete Payment
  const handleDeletePayment = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    if (updatedPayments.length === 0) setShowPaymentTable(false);
  };

  return (
    <div className="expenses-container">
      {/* New Expense Button */}
      <button className="new-expense-btn" onClick={() => setShowExpenseForm(true)}>
        New Expense
      </button>

      {/* Expense Form */}
      {showExpenseForm && (
        <form className="expense-form" onSubmit={handleExpenseSubmit}>
          <input type="date" name="date" value={expenseData.date} onChange={handleExpenseChange} required />
          <select name="category" value={expenseData.category} onChange={handleExpenseChange} required>
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
          </select>
          <input type="text" name="tax" placeholder="Tax" value={expenseData.tax} onChange={handleExpenseChange} required />
          <textarea name="note" placeholder="Note" value={expenseData.note} onChange={handleExpenseChange}></textarea>
          <select name="vendor" value={expenseData.vendor} onChange={handleExpenseChange} required>
            <option value="">Select Vendor</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
          </select>
          <button type="submit">Create</button>
        </form>
      )}

      {/* Expenses Table */}
      {showExpenseTable && (
        <>
          <h2>Expense List</h2>
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Tax</th>
                <th>Note</th>
                <th>Vendor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.date}</td>
                  <td>{exp.category}</td>
                  <td>{exp.tax}</td>
                  <td>{exp.note}</td>
                  <td>{exp.vendor}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteExpense(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Receive Payment Section */}
      <h2>Receive Payment</h2>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <select name="customer" value={paymentData.customer} onChange={handlePaymentChange} required>
          <option value="">Select Customer</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
        <input type="date" name="date" value={paymentData.date} onChange={handlePaymentChange} required />
        <input type="text" name="amount" placeholder="Amount" value={paymentData.amount} onChange={handlePaymentChange} required />
        <select name="paymentMethod" value={paymentData.paymentMethod} onChange={handlePaymentChange} required>
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {/* Payments Table */}
      {showPaymentTable && (
        <>
          <h2>Payment Records</h2>
          <table className="payments-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.customer}</td>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeletePayment(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Expenses;

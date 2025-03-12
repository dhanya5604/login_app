// src/pages/Invoice.js
import React, { useState, useEffect } from "react";
import "../styles/Invoice.css"; // Ensure this file exists for styling

const Invoice = () => {
    const [showForm, setShowForm] = useState(false);
    const [invoices, setInvoices] = useState([]);

    // Load invoices from localStorage on component mount
    useEffect(() => {
        const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
        setInvoices(savedInvoices);
    }, []);

    const handleCreateInvoice = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newInvoice = {
            customer: formData.get("customer"),
            poNumber: formData.get("poNumber"),
            invoiceNo: formData.get("invoiceNo"),
            date: formData.get("date"),
            terms: formData.get("terms"),
            details: formData.get("details"),
            qty: formData.get("qty"),
            price: formData.get("price"),
            tax: formData.get("tax"),
            amount: formData.get("amount"),
            notes: formData.get("notes"),
        };

        const updatedInvoices = [...invoices, newInvoice];
        setInvoices(updatedInvoices);

        // Save to localStorage
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

        setShowForm(false);
    };

    // Function to clear all invoices
    const handleClearInvoices = () => {
        setInvoices([]); // Clear the invoices array
        localStorage.removeItem("invoices"); // Remove from localStorage
    };

    return (
        <div className="invoice-container">
            <h2>" "</h2>
            <button onClick={() => setShowForm(true)} className="new-invoice-btn">New Invoice</button>

            {showForm && (
                <form onSubmit={handleCreateInvoice} className="invoice-form">
                    <label>Customer: <input type="text" name="customer" required /></label>
                    <label>PO No: <input type="text" name="poNumber" /></label>
                    <label>Invoice No: <input type="text" name="invoiceNo" required /></label>
                    <label>Date: <input type="date" name="date" required /></label>
                    <label>Terms: <input type="text" name="terms" /></label>
                    
                    <h3>Invoice Details</h3>
                    <label>Details: <input type="text" name="details" required /></label>
                    <label>Qty: <input type="number" name="qty" required /></label>
                    <label>Price: <input type="number" name="price" required /></label>
                    <label>Tax: <input type="number" name="tax" /></label>
                    <label>Amount: <input type="number" name="amount" required /></label>
                    
                    <label>Notes: <textarea name="notes"></textarea></label>

                    <button type="submit" className="create-btn">Create</button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
                </form>
            )}

            {invoices.length > 0 && (
                <div>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>PO No</th>
                                <th>Invoice No</th>
                                <th>Date</th>
                                <th>Terms</th>
                                <th>Details</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Tax</th>
                                <th>Amount</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice, index) => (
                                <tr key={index}>
                                    <td>{invoice.customer}</td>
                                    <td>{invoice.poNumber}</td>
                                    <td>{invoice.invoiceNo}</td>
                                    <td>{invoice.date}</td>
                                    <td>{invoice.terms}</td>
                                    <td>{invoice.details}</td>
                                    <td>{invoice.qty}</td>
                                    <td>{invoice.price}</td>
                                    <td>{invoice.tax}</td>
                                    <td>{invoice.amount}</td>
                                    <td>{invoice.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Clear Invoices Button */}
                    <button onClick={handleClearInvoices} className="clear-invoices-btn">
                        Clear Invoices
                    </button>
                </div>
            )}
        </div>
    );
};

export default Invoice;

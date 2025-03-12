import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate(); // Get navigation function

    const [totalInvoices, setTotalInvoices] = useState(1); // Prevent division by 0
    const [paymentReceived, setPaymentReceived] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);

    const [taxDeducted, setTaxDeducted] = useState(0);
    const [advanceTax, setAdvanceTax] = useState(0);

    const [cloudExpenses, setCloudExpenses] = useState(0);
    const [otherExpenses, setOtherExpenses] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(1); // Prevent division by 0

    useEffect(() => {
        // ✅ Redirect to login if not authenticated
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        // Fetch Invoice Data
        const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        let totalInvoiceAmount = 0;
        let receivedAmount = 0;

        invoices.forEach(invoice => {
            totalInvoiceAmount += parseFloat(invoice.amount) || 0;
            receivedAmount += (parseFloat(invoice.price) * parseFloat(invoice.qty)) || 0;
        });

        // ✅ Ensure pending amount is not negative
        const pendingAmt = Math.max(totalInvoiceAmount - receivedAmount, 0);

        setTotalInvoices(Math.max(totalInvoiceAmount, 1)); // Prevent division by zero
        setPaymentReceived(Math.min(receivedAmount, totalInvoiceAmount)); // Prevent >100%
        setPendingAmount(pendingAmt);

        // Fetch Expense Data
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        let cloudExp = 0;
        let otherExp = 0;

        expenses.forEach(exp => {
            if (exp.category === "Cloud") {
                cloudExp += parseFloat(exp.tax) || 0;
            } else {
                otherExp += parseFloat(exp.tax) || 0;
            }
        });

        setCloudExpenses(cloudExp);
        setOtherExpenses(otherExp);
        setTotalExpenses(Math.max(cloudExp + otherExp, 1)); // Prevent division by 0

        // Fetch Tax Data
        const payments = JSON.parse(localStorage.getItem("payments")) || [];
        let deductedTax = 0;
        let advancePaid = 0;

        payments.forEach(payment => {
            deductedTax += (parseFloat(payment.amount) * 0.1) || 0; // 10% deducted at source
            advancePaid += parseFloat(payment.amount) * 0.2 || 0; // 20% advance tax paid
        });

        setTaxDeducted(deductedTax);
        setAdvanceTax(advancePaid);
    }, [navigate]); // ✅ Add 'navigate' dependency

    return (
        <div>
            <Navbar />
            <div className="main-content">
                <div className="dashboard-container">
                    <h1>Dashboard</h1>

                    <section>
                        <h2>Invoice Raised</h2>
                        <ProgressBar label="Payment Received" value={paymentReceived} total={totalInvoices} color="#d2ae45" />
                        <ProgressBar label="Pending Amount" value={pendingAmount} total={totalInvoices} color="#d2ae45" />
                    </section>

                    <section>
                        <h2>Tax Paid</h2>
                        <ProgressBar label="Deducted at Source" value={taxDeducted} total={Math.max(taxDeducted + advanceTax, 1)} color="#d2ae45" />
                        <ProgressBar label="Advance Tax Paid" value={advanceTax} total={Math.max(taxDeducted + advanceTax, 1)} color="#d2ae45" />
                    </section>

                    <section>
                        <h2>Expenses</h2>
                        <ProgressBar label="Cloud Expenses" value={cloudExpenses} total={totalExpenses} color="#d2ae45" />
                        <ProgressBar label="Other Expenses" value={otherExpenses} total={totalExpenses} color="#d2ae45" />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;

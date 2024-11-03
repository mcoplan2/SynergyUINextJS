// pages/paymentHistory.tsx
import { getAllPayments } from '@/src/api/paymentApi';
import Table from '@/src/components/Table';
import { useUser } from '@/src/context/UserContext';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import { Payment } from '@/src/types/Payment';
import React, { useState } from 'react';
import styles from './../../home.module.css';


const AllPaymentHistory: React.FC = () => {
    // Assuming you have a user context or state
    const { user } = useUser(); // Adjust based on how you get the user information
    const { data: allPayments, error} = useAuthFetch(getAllPayments, user);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleSelectionChange = (selectedRowIndices: Set<number>) => {
        setSelectedRows(selectedRowIndices);
        console.log("Selected Row Indices:", Array.from(selectedRowIndices));
    };

    // Define the columns for the table
    const columns = [
        { title: 'ID', accessor: 'paymentId' },
        { title: 'First Name', accessor: 'user.firstName' },
        { title: 'Last Name', accessor: 'user.lastName' },
        { title: 'Medication', accessor: 'medicationId.name' },
        { title: 'Dosage Count', accessor: 'reqId.dosageCount' },
        { title: 'Dosage Frequency', accessor: 'reqId.dosageFreq' },
        { title: 'Amount', accessor: 'amount' },
        { title: 'Date', accessor: 'updateDate' },
        { title: 'Status', accessor: 'payStatus' },
    ];

    console.log(allPayments)
    // Check for loading state and errors
    if (error) return <div>Error loading payment history: {error.message}</div>;

    // Transform the payment history to match the column accessors
    const transformedData = Array.isArray(allPayments) 
        ? allPayments.map((payment: Payment) => ({
            ...payment,
            'medicationId.name': payment.medicationId.name,
            'user.firstName': payment.user.firstName,
            'user.lastName': payment.user.lastName,
            'reqId.dosageFreq': payment.reqId.dosageFreq,
            'reqId.dosageCount': payment.reqId.dosageCount,
            
        }))
        : [];

    return (
        <div className={`${styles.container} mx-auto`}>
            <h1 className="text-2xl font-semibold mb-4">Payment History</h1>
            <Table columns={columns} data={transformedData} onSelectionChange={handleSelectionChange} />
        </div>
    );
};

export default AllPaymentHistory;

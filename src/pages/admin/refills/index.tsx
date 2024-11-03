import Table from '@/src/components/Table';
import { useUser } from '@/src/context/UserContext';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import React, { useEffect, useState } from 'react';
import styles from './../../home.module.css';
import { getAllRequests } from '@/src/api/requestApi'; // Ensure you have these functions
import { ReqId } from '@/src/types/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllRequestsPage: React.FC = () => {
    const { user } = useUser();
    const { data: allRequests, error } = useAuthFetch(getAllRequests, user);
    
    const [requests, setRequests] = useState<ReqId[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    // Update requests when allRequests changes
    useEffect(() => {
        if (Array.isArray(allRequests)) {
            setRequests(allRequests.map((request: ReqId) => ({
                ...request,
                'med.name': request.med.name,
                'user.firstName': request.user.firstName,
                'user.lastName': request.user.lastName,
            })));
        }
    }, [allRequests]);

    if (error) return <div>Error loading requests: {error.message}</div>;

    const columns = [
        { title: 'ID', accessor: 'id' },
        { title: 'First Name', accessor: 'user.firstName' },
        { title: 'Last Name', accessor: 'user.lastName' },
        { title: 'Medication', accessor: 'med.name' },
        { title: 'Dosage Count', accessor: 'dosageCount' },
        { title: 'Dosage Frequency', accessor: 'dosageFreq' },
        { title: 'Type', accessor: 'requestType' },
    ];


    const handleSelectionChange = (selectedRowIndices: Set<number>) => {
        setSelectedRows(selectedRowIndices);
        console.log("Selected Row Indices:", Array.from(selectedRowIndices));
    };

   


    return (
        <div className={`${styles.container} mx-auto`}>
            <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
            <Table columns={columns} data={requests} onSelectionChange={handleSelectionChange} />
            <div className="mt-4 flex justify-center space-x-4">
            </div>
        </div>
    );
};

export default AllRequestsPage;

import Table from '@/src/components/Table';
import { useUser } from '@/src/context/UserContext';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import React, { useEffect, useState } from 'react';
import styles from './../../../home.module.css';
import { getNumberOfRequests, approveRequest, denyRequest } from '@/src/api/requestApi'; // Ensure you have these functions
import { ReqId } from '@/src/types/Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PendingRequestsPage: React.FC = () => {
    const { user } = useUser();
    const { data: allRequests, error } = useAuthFetch(getNumberOfRequests, user);
    
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

    const handleApprove = async () => {
        const selectedRequests = Array.from(selectedRows).map(rowIndex => requests[rowIndex]);

        for (const request of selectedRequests) {
            if (!request) {
                console.error("Request is undefined:", request);
                continue; // Skip to the next iteration if request is undefined
            }
            try {
                if (user) {
                    await approveRequest(user, request);
                    // Update the local state to remove the approved request
                    setRequests(prevRequests => prevRequests.filter(req => req.id !== request.id));
                } else {
                    toast.error("User information is not available.");
                    return; // Exit if user is not available
                }
            } catch (error) {
                toast.error(`Failed to approve request ID ${request.id}: ${error}`);
            }
        }

        setSelectedRows(new Set());
        toast.success("Selected requests approved.");
    };

    const handleDeny = async () => {
        const selectedRequests = Array.from(selectedRows).map(rowIndex => requests[rowIndex]);
    
    
        for (const request of selectedRequests) {
            if (!request) {
                console.error("Request is undefined:", request);
                continue; // Skip to the next iteration if request is undefined
            }
    
            try {
                if (user) {
                    await denyRequest(user, request);
                    // Update the local state to remove the denied request
                    setRequests(prevRequests => prevRequests.filter(req => req.id !== request.id));
                } else {
                    toast.error("User information is not available.");
                    return; // Exit if user is not available
                }
            } catch (error) {
                toast.error(`Failed to deny request ID ${request.id}: ${error}`);
            }
        }
    
        // Clear the selected rows after denial
        setSelectedRows(new Set());
        toast.success("Selected requests denied.");
    };

    return (
        <div className={`${styles.container} mx-auto`}>
            <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
            <Table columns={columns} data={requests} onSelectionChange={handleSelectionChange} />
            <div className="mt-4 flex justify-center space-x-4">
                <button 
                    onClick={handleApprove} 
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    disabled={selectedRows.size === 0}
                >
                    Approve
                </button>
                <button 
                    onClick={handleDeny} 
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    disabled={selectedRows.size === 0}
                >
                    Deny
                </button>
            </div>
        </div>
    );
};

export default PendingRequestsPage;

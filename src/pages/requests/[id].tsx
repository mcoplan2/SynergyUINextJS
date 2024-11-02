import { getRequestById } from '@/src/api/requestApi';
import { useUser } from '@/src/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RefillRequest } from '@/src/types/Request';
import Modal from '@/src/components/Modal';

const RefillDetails = () => {
    const { user } = useUser();
    const router = useRouter();
    const { id } = router.query; // Get the ID from the query parameters
    const [refill, setRefill] = useState<RefillRequest| null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchRefillDetails = async () => {
            const refillId = Array.isArray(id) ? id[0] : id;

            if (refillId && !isNaN(Number(refillId))) {
                try {
                    if (user) {
                        const refillData = await getRequestById(user, Number(refillId));
                        setRefill(refillData);
                    } else {
                        console.error("User is not authenticated.");
                    }
                } catch (err) {
                    setError('Failed to fetch refill details.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Handle case where refillId is not valid
            }
        };

        fetchRefillDetails();
    }, [id, user]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!refill) return <p>No refill found.</p>;

    // Safeguard: Check if medicationId exists before accessing its properties
    const medicationName = refill.medicationId?.name || 'Unknown Medication';
    const updateDate = refill.updateDate || 'No Date Available';
    const dosageCount = refill.reqId?.dosageCount || 'No Quantity Available';

    return (
        <div>
            <h1>Refill Details</h1>
            <button onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                View Refill Details
            </button>

            {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Refill Details">
                <h2>{medicationName}</h2>
                <p>Refill Date: {updateDate}</p>
                <p>Quantity: {dosageCount}</p>
                {/* Add more details as needed */}
            
        </div>
    );
};

export default RefillDetails;

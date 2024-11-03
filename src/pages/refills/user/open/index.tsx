// pages/refill-prescription.tsx
import { useUser } from "@/src/context/UserContext";
import useAuthFetch from "@/src/hooks/useAuthFetch";
import { getNumberOfRequests } from "@/src/api/requestApi";
import { ReqId } from '@/src/types/Request';

const OpenPrescriptionPage = () => {
    const { user } = useUser();
    const { data: allOpenRequests } = useAuthFetch(getNumberOfRequests, user);

    return (
        <div className="container"> {/* Use the class name directly */}
            <h1 className="title">Open Requests</h1> {/* Use the class name directly */}
    
            {Array.isArray(allOpenRequests) && allOpenRequests.length > 0 ? (
                <ul className="medicationList"> {/* Use the class name directly */}
                    {allOpenRequests.map((request: ReqId) => (
                        <li key={request.id} className="medicationItem"> {/* Use the class name directly */}
                            <h2>{request.med.name}</h2>
                            <p><strong>Dosage:</strong> {request.dosageCount}</p>
                            <p><strong>Freq:</strong> {request.dosageFreq}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Requests found.</p>
            )}
        </div>
    );
};

export default OpenPrescriptionPage;

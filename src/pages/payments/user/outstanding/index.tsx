import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../../../home.module.css';
import { useUser } from '@/src/context/UserContext';
import { getUnpaidPaymentsByUser, updatePayment } from '@/src/api/paymentApi';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import { Payment } from '@/src/types/Payment';
import PaymentModal from '@/src/components/PaymentModal';
import { useRouter } from 'next/router';

const OutstandingPaymentsPage: React.FC = () => {
    const router = useRouter();
    const { user } = useUser();
    const [paymentInfo, setPaymentInfo] = useState<{ cardNumber: string; expirationDate: string; cvv: string }>({ cardNumber: '', expirationDate: '', cvv: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const { data: unpaidPayments = [], isLoading } = useAuthFetch(getUnpaidPaymentsByUser, user);

    if (!user) return <p className="text-center mt-10">Loading user data...</p>;
    if (isLoading) return <p className="text-center mt-10">Loading unpaid payments...</p>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedPayment) {
                await updatePayment(user, selectedPayment);
                toast.success('Payment submitted successfully!'); 
                setIsModalOpen(false); // Close the modal
                setSelectedPayment(null); // Reset selected payment ID
                setPaymentInfo({ cardNumber: '', expirationDate: '', cvv: '' });
                router.push('/home');
            }
        } catch (error) {
            console.error("Payment failed:", error);
            // Handle error (e.g., show a notification)
        }
    };
    const amount = unpaidPayments.find((payment: Payment) => payment.paymentId === selectedPayment?.paymentId)?.amount || '0.00';

    return (
        <div className={styles.container}>
            <main className={styles.main}>
            <h1 className={styles.welcomeTitle}>Outstanding Payments</h1>

            {/* Open Refills Section */}
            <div className={styles.section}>
                {unpaidPayments.length > 0 ? (
                    <div className={styles.cardGrid}>
                        {unpaidPayments.map((payment: Payment) => (
                            <div key={payment.paymentId} className={styles.card}>
                                <h3 className={styles.cardTitle}>{payment.medicationId.name}</h3>
                                <p className={styles.cardText}>ID: {payment.paymentId}</p>
                                <p className={styles.cardText}>First Name: {payment.user.firstName}</p>
                                <p className={styles.cardText}>Last Name: {payment.user.lastName}</p>
                                <p className={styles.cardText}>Quantity: {payment.reqId.dosageCount}</p>
                                <p className={styles.cardText}>Freq: {payment.reqId.dosageFreq}</p>
                                <p className={styles.cardText}>Cost: ${payment.amount}</p>
                                <button
                                    className={styles.linkButton}
                                    onClick={() => {
                                        setSelectedPayment(payment);
                                        setIsModalOpen(true); // Open the modal
                                    }}
                                >
                                    Make a Payment
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 cardText">No unpaid payments at the moment.</p>
                )}
            </div>

            <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                <hr className="separator" />
                    {/* Display Amount Due */}
                    <div>
                        <label>
                            Amount Due:
                            <p className="amountDue">${amount}</p>
                        </label>
                    </div>
                    <hr className="separator" />

                    <div>
                        <label>
                            Name
                            <input
                                type="text"
                                name="expirationDate"
                                value={paymentInfo.expirationDate}
                                onChange={handleInputChange}
                                disabled
                            />
                        </label>
                    </div>


                    <div>
                        <label>
                            Card Number:
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                onChange={handleInputChange}
                                disabled
                            />
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            Expiration Date:
                            <input
                                type="text"
                                name="expirationDate"
                                value={paymentInfo.expirationDate}
                                onChange={handleInputChange}
                                disabled
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            CVV:
                            <input
                                type="text"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handleInputChange}
                                disabled
                            />
                        </label>
                    </div>

                    <button type="submit">Pay</button>
                </form>
            </PaymentModal>
            </main>
        </div>
    );
};

export default OutstandingPaymentsPage;

// src/components/Modal.tsx
import React from 'react';
import styles from './Modal.module.css'; // Create this CSS file for styling

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // The content to display inside the modal
}

const PaymentModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Do not render if the modal is not open

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default PaymentModal;

import React from 'react';
import styles from './modal.module.css'; // Add your CSS styles here

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    refillDetails?: {
        name: string;
        updateDate: string;
        dosageCount: number;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, refillDetails }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{refillDetails?.name}</h2>
                <p>Refill Date: {refillDetails?.updateDate}</p>
                <p>Quantity: {refillDetails?.dosageCount}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

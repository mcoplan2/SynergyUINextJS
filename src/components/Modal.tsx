import React from 'react';
import styles from './Modal.module.css'; // Add your CSS styles here

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    refillDetails: {
        id: number;
        name: string;
        updateDate: string;
        creationDate: string;
        dosageCount: number;
        dosageFreq: number;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, refillDetails }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{refillDetails?.name}</h2>
                <p>Refill ID: {refillDetails?.id}</p>
                <p>Created On: {refillDetails?.creationDate}</p>
                <p>Refilled On: {refillDetails?.updateDate}</p>
                <p>Quantity: {refillDetails?.dosageCount}</p>
                <p>Freq: {refillDetails?.dosageFreq}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

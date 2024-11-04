import { useState, useEffect } from 'react';
import { UserFormData } from '../types/User';
import styles from './login.module.css';
import ErrorModal from '../components/ErrorModal';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfilePage: React.FC = () => {
    const { user, setUser } = useUser(); 
    const [formData, setFormData] = useState<UserFormData | null>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableFields, setEditableFields] = useState({
        firstName: false,
        lastName: false,
        username: false,
        password: false,
    });
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        } as UserFormData));
    };

    const handleToggleEdit = (field: keyof UserFormData) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (formData) {
                // const updatedUser = await updateUserProfile(formData); // `updateUserProfile` sends updated data to server
                // setUser(updatedUser); // Update user context with new data
                toast.success('Profile updated successfully!');
                router.push('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
                setError(errorMessage);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            setIsModalOpen(true);
            console.error('Profile update error:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'username', 'password'].map((field) => (
                    <div className={styles.fieldContainer} key={field}>
                        <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <div className={styles.inputContainer}>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                name={field}
                                className={`${styles.input} ${editableFields[field as keyof UserFormData] ? styles.editable : ''}`} // Apply editable class conditionally
                                value={formData ? formData[field as keyof UserFormData] || '' : ''}
                                disabled={!editableFields[field as keyof UserFormData]}
                                placeholder={field === 'password' ? 'Enter new password' : ''}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles.editButton}
                                onClick={() => handleToggleEdit(field as keyof UserFormData)}
                            >
                                {editableFields[field as keyof UserFormData] ? `   X   ` : 'Edit'}
                            </button>
                        </div>
                    </div>
                ))}
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
            {isModalOpen && (
                <ErrorModal
                    message={error!}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EditProfilePage;

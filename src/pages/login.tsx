import { useState } from 'react';
import { login, register } from '../api/userApi';
import { User } from '../types/User';
import styles from './login.module.css';
import ErrorModal from '../components/ErrorModal';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
    const { setUser } = useUser(); // Get setUser from context
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setFormData(null);
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        } as User));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const loggedInUser = await login(formData); // `login` returns `AuthenticationResponse | null`
                
                if (loggedInUser) {
                    setUser(loggedInUser); 
                    router.push('/home');
                } else {
                    setError('User could not be authenticated. Please try again.');
                    setIsModalOpen(true);
                }
            } else {
                await register(formData);
                // Optionally, set a message or redirect after successful registration
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
            console.error('Login/Register error:', err);
        }
        
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className={styles.label}>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={styles.input}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={styles.label}>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={styles.input}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="mb-4">
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            className={styles.input}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className={styles.toggleText}>
                    {isLogin ? 'No account?' : 'Already have an account?'}
                    <button
                        className={styles.toggleButton}
                        onClick={handleToggle}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
            {/* Render the modal conditionally */}
            {isModalOpen && (
                <ErrorModal
                    message={error!}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default LoginPage;

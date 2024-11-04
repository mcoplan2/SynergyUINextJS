import { useState } from 'react';
import { login, register } from '../api/userApi';
import { User } from '../types/User';
import styles from './login.module.css';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage: React.FC = () => {
    const { setUser } = useUser(); // Get setUser from context
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<User | null>(null);
    const router = useRouter();

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setFormData(null);
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
                    toast.success('Logged in successfully!');
                    router.push('/home');
                } else {
                    toast.error('User could not be authenticated. Please try again.');
                }
            } else {
                await register(formData);
                toast.success('You have been registered successfully!');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error('An unexpected error occurred. Please try again.');
            } else if (err instanceof Error) {
                toast.error('An unexpected error occurred. Please try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
            toast.error('An unexpected error occurred. Please try again.');
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
        </div>
    );
};

export default LoginPage;

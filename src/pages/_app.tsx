import '../styles/globals.css'; // Import global styles
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context/UserContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <UserProvider>
                <Header />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000} // Auto close after 5 seconds
                        hideProgressBar={false}
                        closeOnClick
                        pauseOnHover
                        draggable
                        pauseOnFocusLoss
                    />
                <Component {...pageProps} />
                <Footer />
            </UserProvider>
        </>
       
    );
};

export default MyApp;
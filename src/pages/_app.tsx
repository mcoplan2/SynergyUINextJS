import '../styles/globals.css'; // Import global styles
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserProvider } from '../context/UserContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <UserProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </UserProvider>
        </>
       
    );
};

export default MyApp;
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useUser } from '@/src/context/UserContext'
import styles from './index.module.css';

const HomePage: React.FC = () => {
    const router = useRouter()
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            router.push('/home')
        }
    }, [user, router])

    // New function to handle button click
    const handleAuthButtonClick = () => {
        router.push('/login') // Navigate to /login page
    }

    return (
        <div className="min-h-screen">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Hero Section */}
                <section className="bg-[#1B4B8A] text-white rounded-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-4 md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Manage your health with ease
                            </h2>
                            <p className="text-lg text-gray-100">
                                Here you can manage your refills, payments, and more.
                                Synergy Pharmacy, a pharmacy that cares about you.
                            </p>
                            <button className={styles.authButton} onClick={handleAuthButtonClick}>
                                Sign Up / Sign In
                            </button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <Image
                                src="/pillbottle.png"
                                alt="Pharmacy"
                                width={400}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-[#4CAF50] text-white rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-6">
                            <Image
                                src="/check2.png"
                                alt="Pharmacy"
                                width={45}
                                height={45}
                                className="rounded-lg"
                            />
                                <h3 className="text-xl font-semibold mb-2">Low Prices</h3>
                                <p>Competitive pricing on all medications</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-6">
                            <Image
                                src="/check2.png"
                                alt="Pharmacy"
                                width={45}
                                height={45}
                                className="rounded-lg"
                            />
                                <h3 className="text-xl font-semibold mb-2">Refills</h3>
                                <p>Easy and convenient prescription refills</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 rounded-lg p-6">
                            <Image
                                src="/check2.png"
                                alt="Pharmacy"
                                width={45}
                                height={45}
                                className="rounded-lg"
                            />
                                <h3 className="text-xl font-semibold mb-2">24/7 Pharmacists</h3>
                                <p>Professional support whenever you need it</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="bg-[#1B4B8A] text-white rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">
                                1) Sign up for Synergy Pharmacy
                            </h3>
                            <p>Create your account in minutes</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">
                                2) We'll Receive your Prescription
                            </h3>
                            <p>Seamless prescription transfer</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">
                                3) Get Your Medication
                            </h3>
                            <p>Quick and convenient pickup</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-[#4CAF50] text-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">What Customers Are Saying</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            "Synergy Pharmacy has been a lifesaver!",
                            "The best pharmacy experience I've ever had!",
                            "Great prices and excellent service!",
                            "Highly recommend Synergy Pharmacy!"
                        ].map((text, index) => (
                            <div key={index} className="bg-white/10 rounded-lg p-6 text-center">
                                <p className="mb-4">{text}</p>
                                <div className="text-sm font-semibold">Customer {index + 1}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage

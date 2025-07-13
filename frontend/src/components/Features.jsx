import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const features = [
    {
        id: 'custom-alias',
        title: 'Custom Alias',
        description: 'Create personalized short URLs like sho.rt/my-brand.',
        image: 'https://via.placeholder.com/400x300?text=Custom+Alias',
    },
    {
        id: 'analytics',
        title: 'Link Analytics',
        description: 'Track clicks, locations, and referrals for each link.',
        image: 'https://via.placeholder.com/400x300?text=Analytics',
    },
    {
        id: 'dark-mode',
        title: 'Dark Mode',
        description: 'Seamless theme toggling for a comfortable experience.',
        image: 'https://via.placeholder.com/400x300?text=Dark+Mode',
    },
    {
        id: 'secure',
        title: 'Secure Redirects',
        description: 'Short links are safe and go through verification.',
        image: 'https://via.placeholder.com/400x300?text=Secure+Redirects',
    },
];

export default function Features({ scrollTo, sectionIds }) {
    return (
        <>
            {features.map((feature, index) => {
                const isLast = index + 2 === sectionIds.length;

                return (
                    <section
                        key={feature.id}
                        id={feature.id}
                        className="snap-start h-screen flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-950 text-black dark:text-white relative"
                    >
                        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                            <img src={feature.image} alt={feature.title} className="rounded-xl shadow-lg" />
                            <div>
                                <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
                                <p className="text-lg text-gray-700 dark:text-gray-300">{feature.description}</p>
                            </div>
                        </div>

                        {isLast && (
                            <button
                                onClick={() => scrollTo('form')}
                                className="absolute bottom-6 text-blue-600 dark:text-blue-400 animate-bounce"
                                aria-label="Scroll to top"
                            >
                                {/* <FaArrowUp size={24} /> */}
                                <span>scroll to top</span>
                            </button>
                        )}

                    </section>
                );
            })}
        </>
    );
}

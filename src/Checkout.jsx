import React, { useState } from 'react';
import axios from 'axios';
import getStripe from './getStripe';

const Checkout = () => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        const stripe = await getStripe()

        try {
            const { data } = await axios.post('http://localhost:5000/create-checkout-session', {
                items: [
                    {
                        id: 'prod_04',
                        name: 'Leather Jacket',
                        amount: 7500,
                        quantity: 1,
                        image: 'https://via.placeholder.com/150'
                    },
                    {
                        id: 'prod_05',
                        name: 'Casual Watch',
                        amount: 2000,
                        quantity: 1,
                        image: 'https://via.placeholder.com/150'
                    }
                ],
            });
            stripe.redirectToCheckout({ sessionId: data.id });

        } catch (error) {
            console.error('Request error:', error);
            alert('Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing…' : 'Checkout'}
            </button>
        </div>
    );
};

export default Checkout;

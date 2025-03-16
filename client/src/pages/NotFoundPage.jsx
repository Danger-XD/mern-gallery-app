import React from 'react';
import Layout from '../components/Layouts/Layout';

const NotFoundPage = () => {
    return (
        <Layout>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <h1 className='font-extrabold text-4xl md:text-7xl pb-5'>404 - Not Found</h1>
                <p className='font-black text-center'>The page you're looking for doesn't exist.</p>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
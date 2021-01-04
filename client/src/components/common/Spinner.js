import React from 'react';

const Spinner = () => {
    return (
        <div style={{ width: '200px', margin: 'auto', display: 'block' }}>
            <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;

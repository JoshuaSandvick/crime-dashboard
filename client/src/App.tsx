import React from 'react';
import './App.css';
import ComponentWidget from './ComponentWidget';

const App: React.FC = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '600px',
                    width: '1400px',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ComponentWidget id="1" />
                    <ComponentWidget id="2" />
                    <ComponentWidget id="3" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ComponentWidget id="4" />
                    <ComponentWidget id="5" />
                    <ComponentWidget id="6" />
                </div>
            </div>
        </>
    );
};

export default App;

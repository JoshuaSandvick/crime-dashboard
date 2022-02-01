import React from 'react';
import './App.css';
import ComponentWidget from './ComponentWidget';
import axios from 'axios';

const App: React.FC = () => {
    const [testServerCall, setTestServerCall] = React.useState<string>();

    React.useEffect(() => {
        axios.get('/api/v1/say-something').then((res) => {
            const response = res.data;
            setTestServerCall(response.body);
        });
    });

    return (
        <>
            <div>{testServerCall}</div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '600px',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '850px' }}>
                    <ComponentWidget id="1" />
                    <ComponentWidget id="2" />
                    <ComponentWidget id="3" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '850px' }}>
                    <ComponentWidget id="4" />
                    <ComponentWidget id="5" />
                    <ComponentWidget id="6" />
                </div>
            </div>
        </>
    );
};

export default App;

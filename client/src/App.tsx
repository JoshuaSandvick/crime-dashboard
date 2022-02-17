import React from 'react';
//import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import CrimeWidget from './Components/CrimeWidget/CrimeWidget';

const App: React.FC = () => {
    return (
        <Dashboard title="Crime Dashboard">
            <CrimeWidget />
        </Dashboard>
    );
};

export default App;

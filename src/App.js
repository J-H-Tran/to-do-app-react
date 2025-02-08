import React from 'react';
import Login from './components/Login/Login';

function App() {
    const handleLogin = async ({ username, password }) => {
        try {
            const response = await fetch('http://localhost:8080/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRegister = async ({ username, password, email, first_name, last_name }) => {
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, first_name, last_name }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Check if the response has a body before parsing it as JSON
            const data = response.headers.get('Content-Length') > 0 ? await response.json() : {};
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <Login onLogin={handleLogin} onRegister={handleRegister} />
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function SignUp() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        city_state: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigation = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            navigation(`/login`);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <main>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            required
                            value={user.username}
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            className="form-control"
                            id="username"
                            name="username"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="city_state">City & State</label>
                        <input
                            required
                            value={user.city_state}
                            onChange={e => setUser({ ...user, city_state: e.target.value })}
                            className="form-control"
                            id="city_state"
                            name="city_state"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            className="form-control"
                            id="password"
                            name="password" />
                    </div>
                </div>
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Sign Up" />
            </form>
        </main>
    );
}

export default SignUp;
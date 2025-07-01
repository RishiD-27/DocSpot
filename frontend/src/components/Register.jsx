import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('📤 Submitting register form:', { name, email, password, role });

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      console.log('📥 Response from backend:', res.status, data);

      if (res.ok) {
        alert(`✅ Registered successfully as ${role}. You can now log in.`);
        navigate('/login');
      } else {
        if (res.status === 409 || data.error === 'User already exists') {
          alert('⚠️ Already registered. Redirecting to login.');
          navigate('/login');
        } else {
          alert(`❌ Registration failed: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (err) {
      console.error('❌ Network error during registration:', err);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={formStyle}>
          <h2 style={titleStyle}>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" style={buttonStyle}>Register</button>
          </form>
          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#555' }}>
            Already registered? <Link to="/login" style={linkStyle}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: `url('https://images.unsplash.com/photo-1588776814546-ec0e209f4dd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat`,
};

const overlayStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '3rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  maxWidth: '450px',
  width: '100%',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  color: '#673ab7',
  textAlign: 'center',
  marginBottom: '1.5rem',
  fontWeight: 'bold',
  fontSize: '2rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '1rem',
  backgroundColor: '#009688',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background 0.3s',
};

const linkStyle = {
  color: '#673ab7',
  fontWeight: 'bold',
  textDecoration: 'none',
};

export default Register;

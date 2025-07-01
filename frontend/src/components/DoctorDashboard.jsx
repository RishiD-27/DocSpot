import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      const userData = JSON.parse(localStorage.getItem(email));
      if (userData?.role === 'doctor') {
        setDoctorName(userData.name || 'Doctor');
        fetchAppointments(email);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchAppointments = async (doctorEmail) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorEmail}`);
      if (res.data.length === 0) {
        // 👇 inject sample data for display
        setAppointments([
          {
            _id: 'sample1',
            patientEmail: 'patient1@example.com',
            date: new Date().toISOString(),
            reason: 'Routine check-up',
            status: 'Pending',
          },
          {
            _id: 'sample2',
            patientEmail: 'patient2@example.com',
            date: new Date(Date.now() + 86400000).toISOString(),
            reason: 'Follow-up consultation',
            status: 'Approved',
          },
        ]);
      } else {
        setAppointments(res.data);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to load appointments.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/approve`);
      alert('✅ Appointment approved!');
      refreshAppointments();
    } catch (error) {
      console.error(error);
      alert('Failed to approve appointment.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/reject`);
      alert('❌ Appointment rejected!');
      refreshAppointments();
    } catch (error) {
      console.error(error);
      alert('Failed to reject appointment.');
    }
  };

  const refreshAppointments = () => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) fetchAppointments(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>HealthEase</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem} onClick={() => navigate('/')}>🏠 Home</li>
          <li style={styles.menuItem} onClick={() => navigate('/doctor')}>📋 Appointments</li>
          <li style={styles.menuItem} onClick={handleLogout}>↩️ Logout</li>
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, Dr. {doctorName}</h2>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Patient Appointments</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient Email</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.emptyRow}>No appointments found.</td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td style={styles.td}>{appt.patientEmail}</td>
                    <td style={styles.td}>
                      {appt.date ? new Date(appt.date).toLocaleString() : 'N/A'}
                    </td>
                    <td style={styles.td}>{appt.reason}</td>
                    <td style={styles.td}>{appt.status}</td>
                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.actionBtn,
                          backgroundColor: '#009688',
                          opacity: appt.status === 'Approved' ? 0.6 : 1,
                          cursor: appt.status === 'Approved' ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => handleApprove(appt._id)}
                        disabled={appt.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          ...styles.actionBtn,
                          backgroundColor: '#e53935',
                          opacity: appt.status === 'Rejected' ? 0.6 : 1,
                          cursor: appt.status === 'Rejected' ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => handleReject(appt._id)}
                        disabled={appt.status === 'Rejected'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f4f6f8',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#673ab7',
    color: 'white',
    padding: '20px',
  },
  logo: {
    fontSize: '24px',
    marginBottom: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    marginBottom: '20px',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
  },
  welcome: {
    fontSize: '26px',
    color: '#673ab7',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#009688',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    backgroundColor: '#e1d7f7',
    padding: '12px',
    color: '#673ab7',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
    color: '#333',
  },
  actionBtn: {
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    marginRight: '8px',
    fontWeight: 'bold',
  },
  emptyRow: {
    padding: '20px',
    textAlign: 'center',
    color: '#888',
  },
};

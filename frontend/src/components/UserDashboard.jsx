import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      const userData = JSON.parse(localStorage.getItem(email));
      if (userData?.role === 'user') {
        setUserName(userData.name || 'User');
        fetchDoctors();
        fetchAppointments(email);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors/all');
      setDoctors(res.data);
    } catch (error) {
      alert('Failed to fetch doctors');
    }
  };

  const fetchAppointments = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${email}`);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch appointments.');
    }
  };

  const handleBook = async (doctor) => {
    const email = localStorage.getItem('loggedInEmail');
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        patientEmail: email,
        doctorEmail: doctor.email,
        doctorName: doctor.name,
        reason: 'General Consultation',
      });
      alert(`✅ Appointment booked with ${doctor.name}`);
      fetchAppointments(email);
    } catch (error) {
      console.error(error);
      alert('Booking failed.');
    }
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
          <li
            style={{
              ...styles.menuItem,
              backgroundColor: activeTab === 'dashboard' ? '#009688' : 'transparent',
            }}
            onClick={() => setActiveTab('dashboard')}
          >
            📋 Dashboard
          </li>
          <li
            style={{
              ...styles.menuItem,
              backgroundColor: activeTab === 'history' ? '#009688' : 'transparent',
            }}
            onClick={() => setActiveTab('history')}
          >
            📅 Booking History
          </li>
          <li style={styles.menuItem} onClick={handleLogout}>
            ↩️ Logout
          </li>
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, {userName}</h2>

        {activeTab === 'dashboard' ? (
          <>
            {doctors.length === 0 ? (
              <p>No doctors available at the moment.</p>
            ) : (
              <div style={styles.cardsContainer}>
                {doctors.map((doc, index) => (
                  <div key={index} style={styles.card}>
                    <h3 style={styles.cardTitle}>{doc.name}</h3>
                    <p><strong>Specialization:</strong> {doc.specialization}</p>
                    <p><strong>Availability:</strong> {doc.availability}</p>
                    <button
                      style={styles.bookButton}
                      onClick={() => handleBook(doc)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {appointments.length === 0 ? (
              <p>No appointment history.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Doctor</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{appt.doctorName || 'N/A'}</td>
                      <td style={styles.td}>{appt.doctorEmail}</td>
                      <td style={styles.td}>{appt.date || 'N/A'}</td>
                      <td style={styles.td}>{appt.status}</td>
                      <td style={styles.td}>{appt.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

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
    boxSizing: 'border-box',
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
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    transition: 'background 0.3s',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
  },
  welcome: {
    fontSize: '26px',
    marginBottom: '30px',
    color: '#673ab7',
    fontWeight: 'bold',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#009688',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  bookButton: {
    backgroundColor: '#009688',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    alignSelf: 'flex-start',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#e1d7f7',
    padding: '12px',
    fontWeight: 'bold',
    color: '#673ab7',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    color: '#555',
  },
};

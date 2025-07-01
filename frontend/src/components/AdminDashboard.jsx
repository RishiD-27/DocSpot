import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    fetchPendingDoctors();
    fetchRegisteredUsers();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors/pending');
      if (res.data.length === 0) {
        setPendingDoctors([
          {
            _id: 'sample-doc-1',
            name: 'Dr. Priya Sharma',
            email: 'priya.sharma@example.com',
            specialization: 'Cardiology',
          },
          {
            _id: 'sample-doc-2',
            name: 'Dr. Anil Kumar',
            email: 'anil.kumar@example.com',
            specialization: 'Dermatology',
          },
        ]);
      } else {
        setPendingDoctors(res.data);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch pending doctors.');
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      if (res.data.length === 0) {
        setRegisteredUsers([
          {
            _id: 'user1',
            name: 'Niharika I.',
            email: 'niharika@gmail.com',
            role: 'admin',
          },
          {
            _id: 'user2',
            name: 'Ravi Teja',
            email: 'ravi.teja@example.com',
            role: 'user',
          },
          {
            _id: 'user3',
            name: 'Dr. Meena R.',
            email: 'meena.r@example.com',
            role: 'doctor',
          },
        ]);
      } else {
        setRegisteredUsers(res.data);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch users.');
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${doctorId}/approve`);
      alert('Doctor approved successfully!');
      fetchPendingDoctors();
      fetchRegisteredUsers();
    } catch (error) {
      console.error(error);
      alert('Failed to approve doctor.');
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>HealthEase</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>🏠 Dashboard</li>
          <li style={styles.menuItem}>👨‍⚕️ Approve Doctors</li>
          <li style={styles.menuItem}>👥 View Users</li>
          <li style={styles.menuItem}>📅 Appointments</li>
          <li style={styles.menuItem}>↩️ Logout</li>
        </ul>
      </aside>

      <main style={styles.mainContent}>
        <h2 style={styles.welcome}>Welcome, Admin</h2>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pending Doctor Approvals</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Specialization</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingDoctors.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.emptyRow}>No pending doctors.</td>
                </tr>
              ) : (
                pendingDoctors.map((doc) => (
                  <tr key={doc._id}>
                    <td style={styles.td}>{doc.name}</td>
                    <td style={styles.td}>{doc.email}</td>
                    <td style={styles.td}>{doc.specialization}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.actionBtn}
                        onClick={() => approveDoctor(doc._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Registered Users</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" style={styles.emptyRow}>No users found.</td>
                </tr>
              ) : (
                registeredUsers.map((user) => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.role}</td>
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

export default AdminDashboard;

// -----------------------------------------
// ✅ HealthEase Purple Theme Styles
// -----------------------------------------
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
    marginBottom: '30px',
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
    color: '#333',
    textAlign: 'left',
  },
  emptyRow: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
  },
  actionBtn: {
    backgroundColor: '#009688',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

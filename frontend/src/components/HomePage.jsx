import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.logo}>DocSpot</h1>
        <nav style={styles.nav}>
          <a href="/login" style={styles.navLink}>Login</a>
          <a href="/register" style={styles.navLink}>Register</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Simplifying Healthcare for Everyone</h2>
          <p style={styles.heroSubtitle}>
            Connect with trusted doctors and book appointments effortlessly.
          </p>
          <a href="/register" style={styles.ctaButton}>Join Now</a>
        </div>
        <img
          src="/images/img.png"
          alt="Doctor Illustration"
          style={styles.heroImage}
        />
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.features}>
        <h3 style={styles.sectionTitle}>Why Choose Docspot?</h3>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h4 style={styles.featureTitle}>Trusted Doctors</h4>
            <p style={styles.featureText}>All professionals are verified and certified.</p>
          </div>
          <div style={styles.featureCard}>
            <h4 style={styles.featureTitle}>Fast Booking</h4>
            <p style={styles.featureText}>Book appointments in a few simple clicks.</p>
          </div>
          <div style={styles.featureCard}>
            <h4 style={styles.featureTitle}>Secure Platform</h4>
            <p style={styles.featureText}>Your health data stays private and protected.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.testimonials}>
        <h3 style={styles.sectionTitle}>Testimonials</h3>
        <blockquote style={styles.quote}>
          “DocSpot helped me find a specialist quickly and easily. It’s a game-changer!”
          <footer style={styles.quoteFooter}>– Priya R.</footer>
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>&copy; 2025 DocSpot. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f4f6f8',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#673ab7',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
  },
  hero: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#009688',
    color: '#fff',
    padding: '4rem 2rem',
  },
  heroContent: {
    maxWidth: '500px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  ctaButton: {
    backgroundColor: '#ff4081',
    color: '#fff',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 600,
    transition: 'background 0.3s',
  },
  heroImage: {
    maxWidth: '400px',
    width: '100%',
    height: 'auto',
    marginTop: '2rem',
  },
  features: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: '#673ab7',
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  featureGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '10px',
    width: '250px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  featureTitle: {
    color: '#009688',
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: '1rem',
    color: '#555',
  },
  testimonials: {
    backgroundColor: '#ede7f6',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  quote: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    maxWidth: '600px',
    margin: 'auto',
    color: '#333',
  },
  quoteFooter: {
    marginTop: '1rem',
    fontWeight: 'bold',
    color: '#673ab7',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#673ab7',
    color: '#fff',
    padding: '1rem',
    marginTop: 'auto',
  },
};

export default HomePage;

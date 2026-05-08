/**
 * LandingPage Component
 * Main college landing page with hero section and admission form
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { applicantAPI } from '../../services/api';
import './LandingPage.css';

const LandingPage = () => {
  // State for quick admission form
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    nationality: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handle input field changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle quick admission form submission
   * @param {Event} e - Form submit event
   */
  const handleQuickAdmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await applicantAPI.createApplicant(formData);
      setSuccess('Application submitted successfully! We will contact you soon.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        nationality: ''
      });
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Error submitting application:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <img 
              src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
              alt="Angliyada Oqish" 
              className="college-logo"
            />
            <h1 className="college-name">Angliyada Oqish</h1>
            <p className="college-tagline">Empowering Minds, Shaping Futures</p>
            <p className="college-description">
              Join our prestigious institution and embark on a journey of academic excellence, 
              innovation, and personal growth. With world-class faculty and state-of-the-art facilities, 
              we prepare students for success in the global marketplace.
            </p>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Programs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Admission Section */}
      <section className="quick-admission-section">
        <div className="admission-container">
          <h2 className="section-title">Quick Admission Registration</h2>
          <p className="section-subtitle">
            Start your journey with Excellence College. Fill out the form below to begin your admission process.
          </p>

          {/* Success Message */}
          {success && (
            <div className="success-message">
              {success}
              <button 
                className="close-btn"
                onClick={() => setSuccess(null)}
              >
                ×
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
              <button 
                className="close-btn"
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          )}

          {/* Quick Admission Form */}
          <form onSubmit={handleQuickAdmission} className="quick-admission-form">
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="form-section">
                <h3>Address Information</h3>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="Enter your state"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Enter your nationality"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Excellence College?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Quality Education</h3>
              <p>World-class curriculum designed to prepare students for global challenges and opportunities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Expert Faculty</h3>
              <p>Learn from industry experts and renowned academicians with years of experience.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Modern Facilities</h3>
              <p>State-of-the-art laboratories, libraries, and learning resources.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Exposure</h3>
              <p>International collaborations and exchange programs for global perspective.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="programs-container">
          <h2 className="section-title">Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <h3>Engineering</h3>
              <p>Computer Science, Mechanical, Civil, Electrical, and more</p>
              <Link to="/courses" className="btn btn-secondary">View Courses</Link>
            </div>
            <div className="program-card">
              <h3>Business</h3>
              <p>MBA, BBA, Finance, Marketing, and Management</p>
              <Link to="/courses" className="btn btn-secondary">View Courses</Link>
            </div>
            <div className="program-card">
              <h3>Sciences</h3>
              <p>Physics, Chemistry, Biology, Mathematics, and Research</p>
              <Link to="/courses" className="btn btn-secondary">View Courses</Link>
            </div>
            <div className="program-card">
              <h3>Arts & Humanities</h3>
              <p>Literature, History, Philosophy, Fine Arts, and Languages</p>
              <Link to="/courses" className="btn btn-secondary">View Courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* College Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <h2 className="section-title">College Gallery</h2>
          <p className="section-subtitle">
            Explore our beautiful campus, modern facilities, and vibrant student life through our photo gallery.
          </p>
          
          <div className="gallery-grid">
            {/* Main College Building */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Main Building"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Main Building</h3>
                <p>Historic architecture meets modern education</p>
              </div>
            </div>

            {/* Campus Library */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Library"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Central Library</h3>
                <p>Knowledge hub with vast collection</p>
              </div>
            </div>

            {/* Science Laboratory */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Science Lab"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Science Laboratory</h3>
                <p>Advanced research facilities</p>
              </div>
            </div>

            {/* Sports Complex */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Sports Complex"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Sports Complex</h3>
                <p>Modern sports facilities for students</p>
              </div>
            </div>

            {/* Student Life */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Student Activities"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Student Life</h3>
                <p>Vibrant campus activities and events</p>
              </div>
            </div>

            {/* Auditorium */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Auditorium"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Auditorium</h3>
                <p>Venue for conferences and cultural events</p>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Computer Lab"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Computer Lab</h3>
                <p>Latest technology for digital learning</p>
              </div>
            </div>

            {/* Garden Area */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Garden"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Botanical Garden</h3>
                <p>Peaceful green spaces for relaxation</p>
              </div>
            </div>

            {/* Cafeteria */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Cafeteria"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Cafeteria</h3>
                <p>Nutritious meals and social space</p>
              </div>
            </div>

            {/* Hostel Building */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Hostel"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Student Hostel</h3>
                <p>Comfortable accommodation for students</p>
              </div>
            </div>

            {/* Conference Hall */}
            <div className="gallery-item">
              <img 
                src="https://world.uz/files/angliyada-oqish-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B836_438383kj.jpg" 
                alt="Angliyada Oqish Conference Hall"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3>Conference Hall</h3>
                <p>Modern facilities for academic events</p>
              </div>
            </div>
          </div>

          {/* Gallery Navigation */}
          <div className="gallery-navigation">
            <button className="gallery-nav-btn prev-btn">‹</button>
            <button className="gallery-nav-btn next-btn">›</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Join Excellence College?</h2>
          <p>Take the first step towards a brighter future. Apply now or explore our programs.</p>
          <div className="cta-buttons">
            <Link to="/applicants" className="btn btn-primary btn-large">
              View All Applications
            </Link>
            <Link to="/courses" className="btn btn-secondary btn-large">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

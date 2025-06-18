import React from "react";

const Dashboard = () => {
  return (
    <div
      className="d-flex flex-column min-vh-100 w-100"
      style={{ overflow: "hidden" }}
    >
      {/* Main Content */}
      <main className="container text-center mt-5 flex-grow-1">
        <h2 className="mb-3">Welcome to QuickMove</h2>
        <p className="text-muted">
          Your trusted partner for smooth and efficient moving services.
        </p>

        {/* About Section */}
        <section className="mt-4">
          <h4>About QuickMove</h4>
          <p className="text-secondary">
            QuickMove Packers & Movers is a professional relocation service
            provider offering end-to-end moving solutions for homes and offices.
            We ensure safe packaging, timely delivery, and customer
            satisfaction. Our team of trained staff uses quality materials and
            modern equipment to handle every move with care.
          </p>
        </section>

        {/* Contact Info */}
        <section className="mt-5">
          <h5>📞 Contact Information</h5>
          <ul className="list-unstyled mt-3 text-secondary">
            <li>
              <strong>📍 Address:</strong> 123 Logistics Street, Manchester, UK
            </li>
            <li>
              <strong>📧 Email:</strong> support@quickmove.com
            </li>
            <li>
              <strong>📞 Phone:</strong> +44 1234 567890
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 w-100 m-0">
        &copy; {new Date().getFullYear()} QuickMove Packers & Movers. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Dashboard;

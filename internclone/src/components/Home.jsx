import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Build Your <span className="text-indigo-600">Career</span> with
          Confidence
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover jobs and internships from trusted companies.  
          Apply faster. Get hired smarter.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/student/dashboard"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Explore Opportunities
          </Link>

          <Link
            to="/employe/signup"
            className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Hire Talent
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">10K+</h2>
            <p className="text-gray-600">Students</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">2K+</h2>
            <p className="text-gray-600">Companies</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">5K+</h2>
            <p className="text-gray-600">Jobs</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">8K+</h2>
            <p className="text-gray-600">Internships</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-indigo-600">CareerHub</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Verified Opportunities
            </h3>
            <p className="text-gray-600">
              Every job and internship is verified to ensure trust and safety.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Fast Applications
            </h3>
            <p className="text-gray-600">
              Apply with your profile in just a few clicks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Smart Hiring
            </h3>
            <p className="text-gray-600">
              Employers shortlist candidates faster with powerful tools.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to take the next step?
        </h2>
        <p className="mt-4 text-lg">
          Join CareerHub today and unlock new opportunities.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

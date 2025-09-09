import React from "react";
// import { Link } from "react-router-dom"; // Assuming react-router-dom is set up
import { motion } from "framer-motion";

// A placeholder for the Link component if react-router-dom is not fully set up.
const Link = ({ to, children }) => <a href={to}>{children}</a>;

// You can find a suitable SVG illustration from sites like unDraw, Freepik, etc.
// For this example, we'll use a placeholder component.
const ResumeIllustration = () => (
  <div className="relative w-full max-w-lg mx-auto lg:mx-0 ">
    {/* Base shape */}
    <div className="bg-white rounded-lg shadow-2xl p-6 border border-gray-100">
      <div className="flex items-center pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-indigo-200 rounded-full"></div>
        <div className="ml-4 flex-grow">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    {/* Floating AI icon */}
    <motion.div
      className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </motion.div>
  </div>
);

const FeatureCard = ({ icon, title, children, variants }) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
    variants={variants}
  >
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </motion.div>
);

const Home = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto flex px-8 md:px-16 lg:px-24 py-24 md:flex-row flex-col items-center min-h-screen">
          {/* Left Side: Text Content */}
          <motion.div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl mb-4 font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Build your next
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Resume with AI
              </span>
            </motion.h1>
            <motion.p
              className="mb-8 leading-relaxed text-lg text-gray-600"
              variants={itemVariants}
            >
              Effortlessly craft a professional resume that stands out. Our AI-powered
              builder helps you highlight your skills and experience perfectly.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              variants={itemVariants}
            >
              <Link to="/signup">
                <button className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 py-3 px-6 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  Get Started Free
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
              <Link to="/templates">
                <button className="inline-flex items-center bg-gray-100 text-gray-800 border border-gray-300 py-3 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transform hover:scale-105 transition-transform duration-300">
                  View Templates
                </button>
              </Link>
            </motion.div>
            <motion.div className="mt-12 text-sm text-gray-500" variants={itemVariants}>
              Trusted by 10,000+ professionals worldwide.
            </motion.div>
          </motion.div>

          {/* Right Side: Illustration */}
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <ResumeIllustration />
          </motion.div>
        </div>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4"
              variants={itemVariants}
            >
              Everything You Need to  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our platform is packed with powerful features to make your resume shine,
              land interviews, and advance your career.
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="AI-Powered Assistance"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                variants={itemVariants}
              >
                Get expert suggestions, rephrase bullet points, and tailor your resume for specific jobs with our intelligent AI writer.
              </FeatureCard>
              <FeatureCard
                title="Customizable Templates"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                }
                variants={itemVariants}
              >
                Choose from a library of professionally designed templates. Easily customize colors, fonts, and layouts to match your style.
              </FeatureCard>
              <FeatureCard
                title="Multiple Download Formats"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                variants={itemVariants}
              >
                Export your finished resume in industry-standard formats, including PDF, DOCX, and even PPTX for presentations.
              </FeatureCard>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- Mock Components for Demo ---
// In a real app, you would handle social logins with a library like Firebase Auth or Auth0
const GoogleIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c2.18 0 3.87.81 4.75 1.62l2.5-2.5C18.44 1.56 15.63 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.04 0 12.04-4.92 12.04-12.04 0-.76-.08-1.52-.2-2.24H12.48z" fill="currentColor"/></svg>;
const GitHubIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>;
// --- End Mock Components ---

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Mocking the axios post for demonstration
  const axios = {
    post: (url, data) => new Promise(res => {
        console.log(`Mock POST to ${url}`, data);
        setTimeout(() => res({ data: { status: "Success", user: { name: data.name, email: data.email }, token: "mock_jwt_token" } }), 1000);
    })
  };

  useEffect(() => {
    const isLoggedIn = () => !!localStorage.getItem('userData');
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/register", formData)
      .then((res) => {
        if (res.data.status === "Success") {
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          localStorage.setItem('token', res.data.token);
          navigate("/dashboard");
        } else {
          alert("Registration failed: " + (res.data.error || "Unknown error"));
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during registration.");
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="grid min-h-screen grid-cols-1 md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Visual Panel */}
        <div className="relative hidden flex-col items-center justify-center bg-gray-900 text-white md:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 opacity-90"></div>
            <motion.div 
              className="relative z-10 w-full max-w-md p-10"
              variants={itemVariants}
            >
                <h1 className="text-4xl font-black tracking-tight text-white">
                    Build Your Professional Story
                </h1>
                <p className="mt-4 text-lg text-indigo-200">
                    Join thousands of professionals who use our AI-powered builder to create stunning resumes that land interviews.
                </p>
                <div className="mt-12">
                    {/* You can add a testimonial or feature highlight here */}
                    <div className="flex items-start">
                        <div className="w-16 h-16 flex-shrink-0 rounded-full bg-indigo-500/20 border-2 border-indigo-400">
                           {/* Illustration can go here */}
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-3 text-indigo-300"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                        </div>
                        <div className="ml-4">
                            <p className="font-semibold text-white">"A complete game-changer."</p>
                            <p className="mt-1 text-sm text-indigo-300">"I went from zero interviews to five in the first week. The templates are incredible."</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Right Form Panel */}
        <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Create your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                account
              </span>
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                  log in to your existing account
                </Link>
              </p>
            </div>

            <motion.div 
              className="mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                    <button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 items-center gap-2">
                        <GoogleIcon /> Sign up with Google
                    </button>
                    <button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 items-center gap-2">
                        <GitHubIcon /> Sign up with GitHub
                    </button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative mt-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </motion.div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"> <User className="h-5 w-5 text-gray-400" /> </div>
                        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Full Name" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"> <Mail className="h-5 w-5 text-gray-400" /> </div>
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"> <Lock className="h-5 w-5 text-gray-400" /> </div>
                        <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button type="submit" className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                            Sign up
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
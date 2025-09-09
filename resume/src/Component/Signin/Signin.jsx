import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- Mock Components for Demo ---
const GoogleIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c2.18 0 3.87.81 4.75 1.62l2.5-2.5C18.44 1.56 15.63 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.04 0 12.04-4.92 12.04-12.04 0-.76-.08-1.52-.2-2.24H12.48z" fill="currentColor"/></svg>;
const GitHubIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>;
// --- End Mock Components ---

export default function SigninPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Mocking the axios post for demonstration
    const axios = {
        post: (url, data) => new Promise(res => {
            console.log(`Mock POST to ${url}`, data);
            if (data.email && data.password) {
                 setTimeout(() => res({ data: { status: "Success", user: { name: "John Doe", email: data.email }, token: "mock_jwt_token" } }), 1000);
            } else {
                 setTimeout(() => res({ data: { status: "Error", error: "Invalid credentials" } }), 1000);
            }
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
        axios.post("http://localhost:3001/login", formData)
            .then((res) => {
                if (res.data.status === "Success") {
                    localStorage.setItem('userData', JSON.stringify(res.data.user));
                    localStorage.setItem('token', res.data.token);
                    navigate("/dashboard");
                } else {
                    alert("Login failed: " + (res.data.error || "Unknown error"));
                }
            })
            .catch((err) => {
                console.log(err);
                alert("An error occurred during login.");
            });
    };
    
    // ANIMATION: Define variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, delayChildren: 0.3, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    };

    const leftPanelVariants = {
        hidden: { x: -200, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.8 } },
    };
    
    const textFloatVariants = {
        hidden: { opacity: 0, y: 30, rotateX: 30 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.7 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <motion.div 
                className="grid min-h-screen grid-cols-1 md:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left Visual Panel */}
                <motion.div 
                    className="relative hidden flex-col items-center justify-center overflow-hidden p-10 md:flex"
                    variants={leftPanelVariants}
                    style={{
                        background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), linear-gradient(135deg, #1f2937, #374151)'
                    }}
                >
                    <motion.div
                        className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"
                        animate={{ y: [0, 50, 0], x: [0, -50, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500 opacity-10 blur-3xl"
                        animate={{ y: [0, -50, 0], x: [0, 50, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    <div className="relative z-10 w-full max-w-md">
                        <motion.h1 
                            className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg"
                            variants={textFloatVariants}
                            transition={{ delay: 0.2 }}
                        >
                            Welcome Back!
                        </motion.h1>
                        <motion.p 
                            className="mt-4 text-xl text-indigo-200 drop-shadow-md"
                            variants={textFloatVariants}
                            transition={{ delay: 0.4 }}
                        >
                            Your career journey continues here. Let's get you signed in.
                        </motion.p>

                        <div className="mt-12 space-y-6">
                            <motion.div variants={itemVariants} transition={{ delay: 0.7 }} className="flex items-start gap-4">
                                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-indigo-500/30 flex items-center justify-center border border-indigo-400">
                                    <CheckCircle className="h-6 w-6 text-indigo-300" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Quick Access</p>
                                    <p className="text-sm text-indigo-300">Jump right back into editing and managing your resumes.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} transition={{ delay: 0.8 }} className="flex items-start gap-4">
                                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-purple-500/30 flex items-center justify-center border border-purple-400">
                                    <Lightbulb className="h-6 w-6 text-purple-300" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Your Progress Saved</p>
                                    <p className="text-sm text-indigo-300">All your hard work is saved and ready for you.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Form Panel */}
                <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
                    <motion.div 
                        className="w-full max-w-md"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 10, delay: 0.5 }}
                    >
                        <div>
                            <h2 className="text-center text-4xl font-extrabold text-gray-900">
                                Sign <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                In
              </span>
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign up
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
                                <motion.button whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} whileTap={{ scale: 0.98 }}
                                    className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 items-center gap-2">
                                    <GoogleIcon className="text-blue-500" /> Sign in with Google
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} whileTap={{ scale: 0.98 }}
                                    className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 items-center gap-2">
                                    <GitHubIcon className="text-gray-800" /> Sign in with GitHub
                                </motion.button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative mt-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-gray-200" /></div>
                                <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
                            </motion.div>

                            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                                <motion.div variants={itemVariants} className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></div>
                                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                                        className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors duration-200" placeholder="Email address" />
                                </motion.div>

                                <motion.div variants={itemVariants} className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="h-5 w-5 text-gray-400" /></div>
                                    <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange}
                                        className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors duration-200" placeholder="Password" />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200">
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <motion.button type="submit"
                                        className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)" }}
                                        whileTap={{ scale: 0.98 }}
                                        animate={{ scale: [1, 1.01, 1] }}
                                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                                    >
                                        Sign In
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

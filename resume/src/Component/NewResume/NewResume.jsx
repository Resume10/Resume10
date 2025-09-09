import { Plus, FileText, MoreVertical, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- MOCK DATA: In a real app, this would come from your state or API ---
const sampleResumes = [
  {
    id: 1,
    title: "Software Engineer Resume",
    lastUpdated: "2 days ago",
    previewUrl: "/placeholder-resume-1.png", // Placeholder image path
  },
  {
    id: 2,
    title: "Product Manager Application",
    lastUpdated: "1 week ago",
    previewUrl: "/placeholder-resume-2.png", // Placeholder image path
  },
];
// --- END MOCK DATA ---


// A reusable component for the "Create New" card for better structure
const CreateNewResumeCard = ({ variants }) => (
  <motion.div variants={variants}>
    <Link
      to="/ResumeData"
      className="group flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg"
    >
      <motion.div 
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
        whileHover={{ scale: 1.1, rotate: 90 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Plus size={32} className="text-white" />
      </motion.div>
      <p className="text-lg font-semibold text-slate-700 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600">
        Create New Resume
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Start from scratch
      </p>
    </Link>
  </motion.div>
);

// A reusable component for displaying an existing resume
const ResumeCard = ({ resume, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
  >
    {/* Placeholder for resume preview */}
    <div className="flex h-48 items-center justify-center bg-slate-100">
        <FileText className="h-16 w-16 text-slate-300" />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="flex-1 text-lg font-bold text-slate-800">{resume.title}</h3>
      <p className="mt-2 text-sm text-slate-500">Last updated: {resume.lastUpdated}</p>
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                <Eye size={16} /> Preview
            </button>
        </div>
        <button className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
            <MoreVertical size={20} />
        </button>
      </div>
    </div>
  </motion.div>
);

const MyResumesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto w-full max-w-7xl flex-grow p-6 sm:p-8">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="mb-10">
                <h1 className="text-4xl font-extrabold text-slate-800">My Resumes</h1>
                <p className="mt-2 text-lg text-slate-600">
                    Manage your resumes or create a new one to get started.
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}
            >
                {/* Create New Card */}
                <CreateNewResumeCard variants={itemVariants} />

                {/* Existing Resume Cards */}
                {sampleResumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} variants={itemVariants} />
                ))}
            </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default MyResumesPage;
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMail, FiPhone, FiGlobe, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { User } from '@/types/user';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  return (
    <AnimatePresence>
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
        >
          <div
            className="flex items-center justify-center min-h-screen p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <FiUser className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiGlobe className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="text-gray-900">{user.website}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiMapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">
                      {user.address.street}, {user.address.suite}
                      <br />
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FiBriefcase className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="text-gray-900">{user.company.name}</p>
                    <p className="text-sm text-gray-500 italic">{user.company.catchPhrase}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, X } from 'lucide-react';
import { Portal } from './Portal';
import { ErrorEffect } from './ErrorEffect';

interface FailModalProps {
  message: string;
  onClose: () => void;
}

const FailModal: React.FC<FailModalProps> = ({ message, onClose }) => {
  return (
      <Portal>
        <AnimatePresence>
          {(
              <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                  <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                      <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="mb-4"
                      >
                        <div className="relative">
                          <motion.div
                              animate={{
                                rotate: [-10, 10, -10],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{
                                duration: 0.5,
                                delay: 0.3,
                                times: [0, 0.5, 1]
                              }}
                          >
                            <XCircle className="w-16 h-16 text-red-500" />
                          </motion.div>
                          <ErrorEffect />
                        </div>
                      </motion.div>

                      <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-bold mb-2 text-gray-800 dark:text-black"
                      >
                        Oops!
                      </motion.h2>

                      <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-gray-600 dark:text-gray-800 mb-6"
                      >
                        {message}
                      </motion.p>

                      <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          onClick={onClose}
                          className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2.5 rounded-full
                      font-medium shadow-lg shadow-red-500/30 hover:shadow-red-500/40
                      hover:transform hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        Try Again
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </Portal>
  );
};

export default FailModal;
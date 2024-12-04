import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Portal } from './Portal';
import { ConfettiEffect } from './ConfettiEffect';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
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
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, delay: 0.3 }}
                          >
                            <CheckCircle className="w-16 h-16 text-green-500" />
                          </motion.div>
                          <ConfettiEffect />
                        </div>
                      </motion.div>

                      <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-bold mb-2 text-gray-800 dark:text-black"
                      >
                        Correct!
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
                          className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2.5 rounded-full
                      font-medium shadow-lg shadow-green-500/30 hover:shadow-green-500/40
                      hover:transform hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        yay!
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

export default SuccessModal;
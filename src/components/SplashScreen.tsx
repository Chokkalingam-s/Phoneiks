import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F77F00] to-[#FF9500] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">P</span>
          </div>
          <h1 className="text-4xl font-semibold text-[#F77F00] mb-2">Phoeniks</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-600"
          >
            Empowering Every Ability
          </motion.p>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center space-x-2 mb-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-[#F77F00] rounded-full opacity-60"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="w-full max-w-xs"
      >
        <Button
          onClick={onContinue}
          className="w-full bg-[#F77F00] hover:bg-[#E67000] text-white py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
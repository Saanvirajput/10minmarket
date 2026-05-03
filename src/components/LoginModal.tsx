'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuth((state) => state.setUser);

  const handleSendOtp = async () => {
    setLoading(true);
    // Real API call to Spring Boot
    await fetch('http://localhost:8080/api/auth/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8080/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      onClose();
    } else {
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
          <X size={24} />
        </button>

        <div className="p-8 pt-12">
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div 
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black mb-2">Login or Signup</h2>
                  <p className="text-gray-500 text-sm">Enter your phone number to continue</p>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500 font-bold border-r pr-3">
                    <Phone size={18} />
                    <span>+91</span>
                  </div>
                  <input 
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full pl-24 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[var(--zepto-purple)] outline-none transition-all font-bold"
                  />
                </div>

                <button 
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length !== 10 || loading}
                  className="w-full bg-[var(--zepto-purple)] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-all shadow-lg"
                >
                  {loading ? 'Sending...' : 'Continue'}
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black mb-2">Verify OTP</h2>
                  <p className="text-gray-500 text-sm">Sent to +91 {phoneNumber}</p>
                </div>

                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[var(--zepto-purple)] outline-none transition-all font-bold tracking-[0.5em] text-center"
                  />
                </div>

                <button 
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-[var(--zepto-purple)] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-all shadow-lg"
                >
                  {loading ? 'Verifying...' : 'Submit OTP'}
                </button>

                <button 
                  onClick={() => setStep('phone')}
                  className="w-full text-sm font-bold text-gray-500 hover:text-black"
                >
                  Change Phone Number
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-gray-50 p-6 text-center">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            By continuing, you agree to our <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

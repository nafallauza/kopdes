import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastNotification = ({ message, type = 'success', onClose }) => {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl shadow-lg border transition-all max-w-sm sm:max-w-md ${
            isSuccess
              ? 'border-emerald-200 shadow-emerald-500/10'
              : 'border-red-200 shadow-red-500/10'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
            ) : (
              <AlertCircle className="w-5 h-5" strokeWidth={2} />
            )}
          </div>

          <div className="flex-1 pr-2">
            <p className="text-xs font-bold text-slate-900">
              {isSuccess ? 'Berhasil Disimpan' : 'Pemberitahuan'}
            </p>
            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-0.5">
              {message}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;

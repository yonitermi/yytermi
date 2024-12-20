import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
interface BaseFieldProps {
  label: string;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, BaseFieldProps {}
interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {}

export const InputField = ({ label, ...props }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-white/90 mb-2 text-right">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-right"
        dir="rtl"
      />
    </div>
  );
};

export const TextAreaField = ({ label, ...props }: TextAreaFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-white/90 mb-2 text-right">{label}</label>
      <textarea
        {...props}
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-right"
        dir="rtl"
      />
    </div>
  );
};
import { IconType } from 'react-icons';
interface ToggleControlProps {
  icon: IconType;
  label: string;
  isActive: boolean;
  onChange: () => void;
}

export const ToggleControl = ({ icon: Icon, label, isActive, onChange }: ToggleControlProps) => {
  return (
    <div className="border-b border-white/20 pb-4">
      <button
        onClick={onChange}
        className="w-full flex items-center justify-between"
        aria-pressed={isActive}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
        <div className={`w-10 h-6 rounded-full transition-colors ${isActive ? 'bg-primary-blue' : 'bg-white/20'}`}>
          <div className={`w-4 h-4 rounded-full bg-white transform transition-transform mt-1 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
      </button>
    </div>
  );
};
import { FaPlus, FaMinus } from 'react-icons/fa';
interface FontSizeControlProps {
  fontSize: number;
  onAdjust: (increase: boolean) => void;
}

export const FontSizeControl = ({ fontSize, onAdjust }: FontSizeControlProps) => {
  return (
    <div className="border-b border-white/20 pb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">גודל טקסט</span>
        <div className="flex gap-2">
          <button
            onClick={() => onAdjust(false)}
            className="bg-white/10 p-2 rounded hover:bg-white/20"
            aria-label="הקטן טקסט"
          >
            <FaMinus size={14} />
          </button>
          <span className="flex items-center px-2">{fontSize}%</span>
          <button
            onClick={() => onAdjust(true)}
            className="bg-white/10 p-2 rounded hover:bg-white/20"
            aria-label="הגדל טקסט"
          >
            <FaPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
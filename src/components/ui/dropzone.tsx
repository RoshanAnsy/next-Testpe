
import { ChangeEvent, FC } from "react";

interface DropZoneProps {
  onFileChange: (files: File[]) => void;  // Accept an array of files
}

export const DropZone: FC<DropZoneProps> = ({ onFileChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("Selected files:", files);
      onFileChange(Array.from(files));  // Convert FileList to Array and pass it
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative group border-2 border-dashed border-gray-300 rounded-lg">
        <div className="aspect-square overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center p-4 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <UploadIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Replace</span>
          </div>
        </div>
        <input
          type="file"
          multiple
          className="sr-only"
          id="file"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="cursor-pointer absolute inset-0  flex items-center justify-center w-full p-4 gap-2"
        >
          <UploadIcon className="w-4 h-4" />
          <span className="text-sm font-medium">upload pepper</span>
        </label>
      </div>
    </div>
  );
};

// UploadIcon component remains unchanged
 const UploadIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
};

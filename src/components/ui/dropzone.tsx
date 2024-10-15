import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
interface DropZoneProps {
  onFileChange: (files: File[]) => void;
}

export const DropZone: FC<DropZoneProps> = ({ onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string | null>(null); // Store the currently clicked image URL

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files to the current list
      onFileChange([...selectedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  const handleImageClick = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setActiveImage(imageUrl); // Set the clicked image as active
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setActiveImage(null); // Clear the active image
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Display selected images */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={100}
              height={100}
              className=" w-24 h-16 object-fill rounded-xl shadow-sm p-1 shadow-black cursor-pointer"
              onClick={() => handleImageClick(file)} // Open the modal on click
            />
            <button
              onClick={() => handleRemoveFile(index)}
              className="absolute top-0 right-0 hover:text-red-800 text-white "
            >
              <TiDelete size={30}/>
            </button>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
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
          className="cursor-pointer absolute inset-0 flex items-center justify-center w-full p-4 gap-2"
        >
          <UploadIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Upload Images</span>
        </label>
      </div>

      {/* Modal for displaying large image */}
      {isModalOpen && activeImage && (
        <div
        className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-75 z-50"
        onClick={closeModal} // Close modal on click
      >
        <div className="  relative max-h-screen  object-fill">
          <Image
            src={activeImage}
            alt="Large Preview"
            className=" object-cover rounded-sm " // object-cover ensures the image covers the space without distortion
             // Ensures it adjusts based on the container size
            height={500} // The height and width act as aspect ratio placeholders (they can be adjusted)
            width={1000}
          />
          <button
            className="absolute top-0 right-0 hover:text-red-700 text-white rounded-full p-1"
            onClick={closeModal}
          >
            <TiDelete size={30} />
          </button>
        </div>
      </div>
      
      )}
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

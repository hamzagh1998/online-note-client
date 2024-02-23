import { useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaStickyNote } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { PiSpinnerGapBold } from "react-icons/pi";

type Props = {
  isUploadFileLoading: boolean;
  setIsFolderModalVisisble: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFile: (file: File | null) => void;
};

export function FloatingButtonComponent({
  isUploadFileLoading,
  setIsFolderModalVisisble,
  uploadFile,
}: Props) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 max-sm:right-4 max-sm:bottom-4">
      {isExpanded && (
        <div className="flex flex-col items-center justify-center space-y-2 mb-4">
          <button
            className="flex justify-center items-center bg-blue-400 w-14 h-14 text-white rounded-full p-4 focus:outline-none hover:bg-blue-500"
            onClick={() => {
              setExpanded(false);
              setIsFolderModalVisisble(true);
            }}
          >
            <FaFolder size={26} />
          </button>
          <button className="flex justify-center items-center bg-blue-400 w-14 h-14 text-white rounded-full p-4 focus:outline-none hover:bg-blue-500">
            <FaStickyNote size={26} />
          </button>
          <label className="flex justify-center items-center bg-blue-400 w-14 h-14 text-white rounded-full p-4 focus:outline-none hover:bg-blue-500 cursor-pointer">
            <input
              type="file"
              accept="*"
              onChange={(e) => {
                !isUploadFileLoading
                  ? uploadFile(e.target.files ? e.target.files[0] : null)
                  : null;
              }}
              style={{ display: "none" }}
            />
            {isUploadFileLoading ? (
              <div className="animate-spin">
                <PiSpinnerGapBold size={23} />
              </div>
            ) : (
              <IoDocuments size={28} />
            )}
          </label>
        </div>
      )}
      <button
        className={`flex justify-center items-center bg-blue-500 w-16 h-16 text-white rounded-full p-4 focus:outline-none hover:bg-blue-600 ${
          isExpanded ? "rotate-45" : null
        }`}
        onClick={toggleExpansion}
      >
        <IoMdAdd size={26} />
      </button>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom";
import { XIcon } from "@heroicons/react/outline";

interface ModalProps {
  open: boolean;
  title: string;
  closeFn: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, title, closeFn, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="p-2 z-50 bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <div
        className="w-full p-3 rounded shadow-lg bg-white text-gray-700 transform -translate-y-10"
        style={{ maxWidth: "600px" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">{title}</h2>
          <button className="cursor-pointer" onClick={closeFn}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="pt-5 pb-1">{children}</div>
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;

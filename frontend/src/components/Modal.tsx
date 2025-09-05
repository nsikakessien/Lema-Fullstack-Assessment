import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4"></div>

        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

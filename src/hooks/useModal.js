import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState();

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  return { isOpen, openModal, closeModal };
}

export default useModal;

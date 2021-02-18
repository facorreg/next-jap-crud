import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import Modal from 'react-modal';

import { modalAtom, closeModalAtom } from '@atoms';

/* eslint-disable sort-keys-fix/sort-keys-fix */

const customStyles = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    maxHeight: '80vh',
    marginRight: '-50%',
    padding: '0px',
    overflowY: 'auto',

    transform: 'translate(-50%, -50%)',

    border: '1px solid #0a5e8f',
  },
  overlay: {
    zIndex: 100,

    background: 'rgba(0, 0, 0, 0.85)',
  },
};

/* eslint-enable sort-keys-fix/sort-keys-fix */

const ModalComp = () => {
  useEffect(() => Modal.setAppElement('body'));

  const [CurrentModal] = useAtom(modalAtom);
  const [isOpen, closeModal] = useAtom(closeModalAtom);

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {CurrentModal?.type && <div className="modalForm">{CurrentModal}</div>}
    </Modal>
  );
};

export default ModalComp;

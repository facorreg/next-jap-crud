import PropTypes from 'proptypes';
import React, { useEffect } from 'react';
import Modal from 'react-modal';

import { ModalContext } from '@contexts';

/* eslint-disable sort-keys-fix/sort-keys-fix */

const customStyles = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    maxHeight: '100vh',
    marginRight: '-50%',
    padding: '0px',
    overflowY: 'auto',

    transform: 'translate(-50%, -50%)',

    border: '1px solid #0a5e8f',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.85)',
  },
};

/* eslint-enable sort-keys-fix/sort-keys-fix */

const ModalComp = ({ children, modalComponents }) => {
  useEffect(() => Modal.setAppElement('body'));

  const [isOpen, setIsOpen] = React.useState(false);
  const [modalName, setModalName] = React.useState(null);
  const [modalProps, setModalProps] = React.useState({});

  const CurrentModal = modalComponents[modalName];

  const openModal = (newModalName, childProps) => {
    setModalName(newModalName);
    setModalProps(childProps);
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = (_, callback) => {
    setIsOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <ModalContext.Provider
      value={{
        afterOpenModal,
        closeModal,
        isOpen,
        openModal,
      }}
    >
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <>
          <div className="modalForm">
            {CurrentModal && <CurrentModal {...modalProps} openModal={openModal} />}
          </div>
        </>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

ModalComp.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  modalComponents: PropTypes.object.isRequired,
};

export default ModalComp;

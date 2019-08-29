import React from "react";
import { Modal } from "reactstrap";
import Title from "../atoms/title";

const ModalWrapper = props => {
  return (
    <Modal className="modal-dialog-centered modal-xl" isOpen={props.isModalOpen}>
      <div className="modal-content">
        <div className="modal-header bg-translucent-light">
          <Title className="modal-title">{props.title}</Title>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={props.onClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            data-dismiss="modal"
            type="button"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;

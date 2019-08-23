import React from "react";
import { Modal } from "reactstrap";

const ModalWrapper = props => {
  return (
    <Modal className="modal-dialog-centered modal-xl" isOpen={props.isModalOpen}>
      <div className="modal-content">
        <div className="modal-header bg-translucent-light">
          <h5 className="modal-title" id="exampleModalLabel">
            {props.title}
          </h5>
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

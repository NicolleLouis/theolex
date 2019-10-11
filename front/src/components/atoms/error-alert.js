import React from "react";

const ErrorAlert = ({ text, notes }) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <span className="alert-icon">
        <i className="fas fa-exclamation-circle" />
      </span>
      <span className="alert-text ml-1">
        <strong>{text}</strong>
        {' '}
        {notes}
      </span>
    </div>
  );
};

export default ErrorAlert;

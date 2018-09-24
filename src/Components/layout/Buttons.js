import React from 'react';

export const AddInputButton = props => {
  return (
    <button
      className={`btn btn-dark my-5 col-${props.col} offset-${props.off}`}
      onClick={props.addInput}
    >
      Add Input
    </button>
  );
};

export const SaveButton = props => {
  const { saveChanges, form } = props;
  const updatedForm = { ...form };
  delete updatedForm.changed;

  return (
    <button
      className={`btn btn-dark my-5 col-3 offset-2 ${
        !form.changed ? 'disabled' : ''
      }`}
      onClick={saveChanges(updatedForm)}
    >
      Save
    </button>
  );
};

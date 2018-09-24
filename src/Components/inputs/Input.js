import React from 'react';
import Condition from './Condition';

const handleFocus = e => {
  const inputGroupNode = e.target.attributes.name.value.match(/(condition)/)
    ? e.target.parentNode.parentNode.parentNode
    : e.target.parentNode.parentNode;

  Array.from(document.querySelectorAll('.form-input')).forEach(input => {
    if (
      (!!input.dataset.sub &&
        input.dataset.sub === inputGroupNode.dataset.key) ||
      input.dataset.key === inputGroupNode.dataset.sub
    ) {
      input.classList.add('input-focus-related');
    }
  });
};
const handleBlur = e => {
  Array.from(document.querySelectorAll('.form-input')).forEach(el => {
    el.classList.remove('input-focus-related');
  });
};

const Input = props => {
  const {
    input,
    addInput,
    deleteInput,
    changeInput,
    isSubInput = false
  } = props;

  const { deeperLayers } = props;
  const [nextLayerInputs = [], ...deeperLayerInputs] = deeperLayers;
  const { offset } = props;
  const subInputs = [...nextLayerInputs].filter(
    subInput => subInput.subOf === input.id
  );

  return (
    <React.Fragment>
      <div
        className="mx-auto col-lg-6 col-md-8 col-9 form-input"
        style={{ left: `${input.layer - offset}em` }}
        data-key={input.id}
        data-sub={input.subOf}
      >
        {isSubInput ? (
          <div className="form-group">
            <Condition
              input={input}
              changeInput={changeInput}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          </div>
        ) : (
          ''
        )}

        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            className="form-control"
            name="question"
            type="text"
            placeholder="Provide your question"
            value={input.question}
            onChange={e => changeInput(e, input)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            name="type"
            value={input.type}
            onChange={e => changeInput(e, input)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="radio">Yes / No</option>
          </select>
        </div>
        <div className="float-right">
          <button
            className="btn btn-success btn-mr"
            onClick={e => addInput(e, input)}
          >
            Add Sub-Input
          </button>
          <button
            className="btn btn-danger"
            onClick={e => deleteInput(e, input)}
          >
            Delete
          </button>
        </div>
        <div className="clearfix" />
      </div>

      {subInputs
        ? subInputs.reverse().map(subInput => {
            return (
              <Input
                isSubInput={true}
                deeperLayers={deeperLayerInputs}
                offset={offset}
                input={subInput}
                key={subInput.id}
                addInput={addInput}
                deleteInput={deleteInput}
                changeInput={changeInput}
              />
            );
          })
        : ''}
    </React.Fragment>
  );
};

export default Input;

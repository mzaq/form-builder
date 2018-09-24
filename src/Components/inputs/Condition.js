import React from 'react';

const Condition = props => {
  const { handleBlur, handleFocus } = props;
  const { changeInput, input } = props;
  const { parentType, condition, conditionValue } = input;

  let Conditions;
  switch (parentType) {
    case 'number':
      Conditions = (
        <React.Fragment>
          <div className="form-row px-1">
            <select
              value={condition}
              name="condition"
              className="form-control col-5"
              onChange={e => changeInput(e, input)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="less">Less than</option>
              <option value="equals">Equals</option>
              <option value="greater">Greater than</option>
            </select>
            <input
              className="form-control col-6 offset-1"
              name="conditionValue"
              type="number"
              placeholder="Given number"
              value={conditionValue}
              onChange={e => changeInput(e, input)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </React.Fragment>
      );
      break;
    case 'text':
      Conditions = (
        <React.Fragment>
          <div className="form-row px-1">
            <select
              className="form-control col-5"
              name="condition"
              defaultValue="equals"
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="equals">Equals</option>
            </select>
            <input
              className="form-control col-6 offset-1"
              type="text"
              placeholder="Equals what?"
              value={conditionValue}
              onChange={e => changeInput(e, input)}
              name="conditionValue"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </React.Fragment>
      );
      break;
    case 'radio':
      Conditions = (
        <React.Fragment>
          <div className="form-row px-1">
            <select
              className="form-control col-5"
              defaultValue="equals"
              name="condition"
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="equals">Equals</option>
            </select>
            <select
              value={conditionValue}
              name="conditionValue"
              className="form-control col-6 offset-1"
              onChange={e => changeInput(e, input)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </React.Fragment>
      );
      break;
    default:
      Conditions = (
        <React.Fragment>
          <h1>Something went wrong with catching the input parent type!</h1>
        </React.Fragment>
      );
      break;
  }

  return (
    <React.Fragment>
      <label htmlFor="condition">Condition</label>
      {Conditions}
    </React.Fragment>
  );
};

export default Condition;

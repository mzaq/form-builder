import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AddInputButton, SaveButton } from './Buttons';
import Inputs from '../inputs/Inputs';

class Editor extends Component {
  state = {};

  componentWillMount() {
    this.setState({
      ...this.props.form
    });
  }

  handleAddInput = (e, parent = null) => {
    const timestamp = new Date().getTime();
    let template = { question: '', type: 'text', layer: 0, id: timestamp };
    if (!!parent) {
      template = {
        ...template,
        layer: parent.layer + 1,
        parentType: parent.type,
        condition: 'equals',
        conditionValue: parent.type === 'radio' ? 'yes' : '',
        subOf: parent.id
      };
    }

    this.setState({
      inputs: [...this.state.inputs].concat(template),
      changed: true
    });
  };

  handleInputChange = (e, changedInput) => {
    const keyValueToUpdate = { [e.target.name]: e.target.value };

    let updatedInputsState = [...this.state.inputs];
    // If input type has changed - change the condition type of it's direct childs
    if (e.target.name === 'type') {
      const parentType = e.target.value;
      const conditionValue = parentType === 'radio' ? 'yes' : '';
      const condition = 'equals';

      // Get next layer inputs
      const nextLayerSubInputs = this.state.inputs.filter(
        subInput => subInput.subOf === changedInput.id
      );

      if (nextLayerSubInputs.length > 0) {
        // Get next layer inputs ids
        const subInputsIds = nextLayerSubInputs.map(subInput => subInput.id);
        updatedInputsState = updatedInputsState.map(
          input =>
            subInputsIds.indexOf(input.id) > -1
              ? {
                  ...input,
                  parentType,
                  conditionValue,
                  condition
                }
              : input
        );
      }
    }

    this.setState({
      inputs: updatedInputsState.map(
        input =>
          changedInput.id === input.id
            ? { ...input, ...keyValueToUpdate }
            : input
      ),
      changed: true
    });
  };

  getConnectedInputs = parentInput => {
    const subInputs = [...this.state.inputs].filter(
      sub => sub.subOf === parentInput.id
    );

    if (subInputs.length > 0) {
      const nestedSubInputs = subInputs.reduce((prev, subInput) => {
        const subSubInputs = this.getConnectedInputs(subInput);

        if (subSubInputs.length > 0) {
          return prev.concat(subSubInputs);
        } else {
          return prev;
        }
      }, []);

      if (nestedSubInputs.length > 0) {
        return subInputs.concat(nestedSubInputs);
      }
    }

    return subInputs;
  };

  handleDeleteInput = (e, input) => {
    let allSubInputs = this.getConnectedInputs(input);
    let updatedInputsState = [...this.state.inputs];

    if (allSubInputs.length > 0) {
      let msg =
        "Do you want to delete this input? You'll delete all of it's subinputs!";
      const confirmed = window.confirm(msg);
      if (!confirmed) return;

      const allSubInputsIds = allSubInputs.map(subInput => subInput.id);
      updatedInputsState = updatedInputsState.filter(
        subInput => allSubInputsIds.indexOf(subInput.id) < 0
      );
    }

    this.setState({
      inputs: updatedInputsState.filter(
        stateInput => stateInput.id !== input.id
      ),
      changed: true
    });
  };

  handleSaveChanges = updatedForm => e => {
    this.setState({
      changed: false
    });

    const { saveForm } = this.props;
    saveForm(updatedForm);
  };

  handleBackButtonClick = e => {
    if (!!this.state.changed) {
      let msg =
        "Do you want to go back without saving? You'll lost unsaved changes!";
      const confirmed = window.confirm(msg);
      if (!confirmed) {
        e.preventDefault();
        return;
      }
    }
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
      changed: true
    });
  };

  render() {
    const { inputs, id } = this.state;

    if (!!id) {
      return (
        <React.Fragment>
          <Link
            to="/"
            className="btn btn-info"
            onClick={this.handleBackButtonClick}
          >
            Back
          </Link>

          <div className="mx-auto col-lg-6 col-md-8 col-9 form-name">
            <div className="form-group">
              <label htmlFor="name">Form name</label>
              <input
                className="form-control"
                name="name"
                type="text"
                placeholder="Enter form name"
                value={this.state.name}
                onChange={this.handleNameChange}
                required
              />
            </div>
          </div>

          <Inputs
            inputs={inputs}
            addInput={this.handleAddInput}
            deleteInput={this.handleDeleteInput}
            handleInputChange={this.handleInputChange}
          />

          {/* 😱 Chained ternary operator*/}
          {/* Change view based on state */}
          {/* Cases: 1) no inputs & form changed, 2) no inputs & form not changed */}
          {/* 3) inputs & form changed, 4) inputs & form not changed */}
          {!!inputs && inputs.length ? (
            <div className="row">
              <AddInputButton addInput={this.handleAddInput} col={3} off={2} />
              <SaveButton
                saveChanges={this.handleSaveChanges}
                form={this.state}
              />
            </div>
          ) : this.state.changed ? (
            <div className="row">
              <AddInputButton addInput={this.handleAddInput} col={3} off={2} />
              <SaveButton
                saveChanges={this.handleSaveChanges}
                form={this.state}
              />
            </div>
          ) : (
            <div className="row">
              <AddInputButton addInput={this.handleAddInput} col={4} off={4} />
            </div>
          )}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3 className="text-center">Form not found!</h3>
        </React.Fragment>
      );
    }
  }
}
export default Editor;

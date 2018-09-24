import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import formDB from './Components/database/Db';

import Navbar from './Components/layout/Navbar';
import Editor from './Components/layout/Editor';
import HallOfForms from './Components/layout/HallOfForms';

class App extends Component {
  state = {
    forms: []
  };

  componentWillMount() {
    formDB.open(refreshForms.bind(this));

    function refreshForms() {
      formDB.fetchForms(
        function(fetchedForms) {
          this.setState({
            forms: fetchedForms
          });
        }.bind(this)
      );
    }
  }

  handleAddForm = e => {
    formDB.createForm(createdForm => {
      this.setState({ forms: this.state.forms.concat(createdForm) });
    });
  };

  handleSaveForm = updatedForm => {
    formDB.saveForm(updatedForm, newForm => {
      this.setState({
        forms: [...this.state.forms].map(
          form => (form.id === newForm.id ? newForm : form)
        )
      });
    });
  };

  handleDeleteForm = id => e => {
    formDB.deleteForm(id, id => {
      this.setState({
        forms: this.state.forms.filter(form => form.id !== id)
      });
    });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={props => (
                  <HallOfForms
                    forms={[...this.state.forms]}
                    addForm={this.handleAddForm}
                    deleteForm={this.handleDeleteForm}
                  />
                )}
              />

              <Route
                exact
                path="/edit/:id"
                component={props => (
                  <Editor
                    form={[...this.state.forms].reduce(
                      (prev, next) =>
                        next.id === parseInt(props.match.params.id, 10)
                          ? { ...prev, ...next }
                          : { ...prev },
                      {}
                    )}
                    saveForm={this.handleSaveForm}
                  />
                )}
              />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

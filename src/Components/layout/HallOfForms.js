import React from 'react';
import { Link } from 'react-router-dom';

const HallOfForms = props => {
  const { forms, addForm, deleteForm } = props;

  return (
    <React.Fragment>
      <h1 className="text-center mb-4">Hall of Forms</h1>

      <div className="table-overflow">
        <table className="table table-hover">
          <caption>List of saved forms</caption>
          <thead className="thead-light">
            <tr>
              <th scope="col" width="10%">
                #
              </th>
              <th scope="col" width="70%">
                Form name
              </th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {!!forms && forms.length > 0 ? (
              forms.map((form, index) => {
                return (
                  <tr key={form.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{form.name || '-'}</td>
                    <td>
                      <Link to={`edit/${form.id}`} className="btn btn-info">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={deleteForm(form.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th scope="row">1</th>
                <td>No entires found!</td>
                <td />
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr />
      <button className="btn btn-success mx-auto d-inherit" onClick={addForm}>
        Add Form
      </button>
    </React.Fragment>
  );
};

export default HallOfForms;

const formDB = (function() {
  const fDB = {};
  let datastore = null;

  // Open a connection to the datastore.
  fDB.open = function(callback) {
    // Database version.
    const version = 1;

    // Open a connection to the datastore.
    const request = indexedDB.open('formBuilder', version);

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      const db = e.target.result;

      e.target.transaction.onerror = fDB.onerror;

      // Delete the old datastore.
      if (db.objectStoreNames.contains('forms')) {
        db.deleteObjectStore('forms');
      }

      // Create a new datastore.
      db.createObjectStore('forms', {
        keyPath: 'id'
      });
    };

    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      datastore = e.target.result;
      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    request.onerror = function(e) {
      console.error('Database could not be opened');
      fDB.onerror(e);
    };
  };

  // Fetch all of the form items in the datastore.
  fDB.fetchForms = function(callback) {
    const db = datastore;
    const transaction = db.transaction(['forms'], 'readwrite');
    const objStore = transaction.objectStore('forms');

    const keyRange = IDBKeyRange.lowerBound(0);
    const cursorRequest = objStore.openCursor(keyRange);

    const forms = [];

    transaction.oncomplete = function(e) {
      callback(forms);
    };

    cursorRequest.onsuccess = function(e) {
      const result = e.target.result;

      if (!!result === false) {
        return;
      }

      forms.push(result.value);
      result.continue();
    };

    cursorRequest.onerror = function(e) {
      console.error("Couldn't fetch forms.");
      fDB.onerror(e);
    };
  };

  fDB.deleteForm = function(id, callback) {
    const db = datastore;
    const transaction = db.transaction(['forms'], 'readwrite');
    const objStore = transaction.objectStore('forms');

    const request = objStore.delete(id);

    request.onsuccess = function(e) {
      callback(id);
    };

    request.onerror = function(e) {
      console.error("Couldn't delete form.");
      fDB.onerror(e);
    };
  };

  fDB.createForm = function(callback) {
    const db = datastore;
    const transaction = db.transaction(['forms'], 'readwrite');
    const objStore = transaction.objectStore('forms');

    const timestamp = new Date().getTime();
    const createdForm = {
      id: timestamp,
      name: `form-${timestamp}`,
      inputs: []
    };

    const request = objStore.put(createdForm);

    request.onsuccess = function(e) {
      callback(createdForm);
    };

    request.onerror = function(e) {
      console.error("Couldn't create form.");
      fDB.onerror(e);
    };
  };

  fDB.saveForm = function(updatedForm, callback) {
    const db = datastore;
    const transaction = db.transaction(['forms'], 'readwrite');
    const objStore = transaction.objectStore('forms');

    const keyRange = IDBKeyRange.lowerBound(0);
    const cursorRequest = objStore.openCursor(keyRange);

    cursorRequest.onsuccess = function(e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === updatedForm.id) {
          const request = cursor.update(updatedForm);

          request.onsuccess = function(e) {
            callback(updatedForm);
          };

          request.onerror = function(e) {
            console.error("Couldn't fetch forms (update request).");
          };
        }

        cursor.continue();
      }
    };
    cursorRequest.onerror = function(e) {
      console.error("Couldn't save form (cursor request).");
      fDB.onerror(e);
    };
  };

  // DB error function
  fDB.onerror = function(e) {
    console.log(e.target.error);
  };

  // Export the fDB object.
  return fDB;
})();

export default formDB;

import React from 'react';
import Input from './Input';

const Inputs = props => {
  const { inputs } = props;

  if (inputs.length > 0) {
    const { addInput, deleteInput, handleInputChange } = props;

    // Reducing inputs array to something like this [[layer0inputs],[layer1inputs],...]
    // and destructuring it to [initialLayer, deeperLayers]. At once.
    const [initialLayer, ...deeperLayers] = [...inputs].reduce(
      (acc, current) => {
        let layers = [...acc];
        if (acc[current.layer] && acc[current.layer].length > 0) {
          layers[current.layer].push(current);
        } else {
          layers[current.layer] = [current];
        }

        return layers;
      },
      []
    );

    // Layout thing
    const deepestLayer = deeperLayers.length;
    const offset = Math.floor(deepestLayer / 2);
    // Layout thing

    return initialLayer.map(input => (
      <Input
        input={input}
        offset={offset}
        deeperLayers={deeperLayers}
        key={input.id}
        addInput={addInput}
        deleteInput={deleteInput}
        changeInput={handleInputChange}
      />
    ));
  } else {
    return (
      <h3 className="text-center">
        Looks like the form is empty.
        <br />
        Oh boy, let's add some inputs!
      </h3>
    );
  }
};

export default Inputs;

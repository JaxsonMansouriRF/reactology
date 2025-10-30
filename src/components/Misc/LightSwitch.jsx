// State Analogy

// Key Points About State
// 1. Local to the component – each component manages its own state (unless using context or Redux).
// 2. Causes re-render – changing state triggers React to re-render that component.
// 3. Immutable update pattern – you don’t modify state directly; you use setter functions (like setIsOn).

import React, { useState } from 'react';

const LightSwitch = () => {
  const [isOn, setIsOn ] = useState(false); //STATE

  // What if I do isOn = !isOn?

  return (
      // react onClick event handler
      <button onClick={() => setIsOn(!isOn)}>
        {/*Conditional rendering*/}
        {isOn ? '💡 The light is ON' : '💡 The light is OFF'}
      </button>
  )
}

export default LightSwitch;



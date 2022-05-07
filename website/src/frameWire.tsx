import React from 'react';
import { nanIsZero, AppState, controlAndLabel } from './App';
import customConvert, { customConvertToFixed, CustomUnit } from './customConverter/customConverter';
import { FrameWireUnitName, frameWireUnits } from './customConverter/frameWire';

export type FrameWires = Record<FrameWireUnitName, string>;

function convertFrameWire(
  event: React.ChangeEvent<HTMLInputElement>,
  from: CustomUnit,
): FrameWires {
  const amount = customConvert(nanIsZero(event), from);
  return {
    frames3Wire: customConvertToFixed(amount, from, frameWireUnits.frames3Wire),
    frames4Wire: customConvertToFixed(amount, from, frameWireUnits.frames4Wire),
    kilogramsOfWire: customConvertToFixed(amount, from, frameWireUnits.kilogramsOfWire),
    poundsOfWire: customConvertToFixed(amount, from, frameWireUnits.poundsOfWire),
  };
}

export default function frameWireControl(
  controlName: FrameWireUnitName,
  state: AppState,
  setState: {(newState: AppState): void},
) {
  const { frameWires } = state;
  const frameWire = frameWires ? frameWires[controlName] : '';

  return controlAndLabel(
    controlName,
    frameWireUnits[controlName].label,
    <input
      type="number"
      name={controlName}
      value={frameWire}
      onChange={(event) => {
        const newFrameWires = convertFrameWire(event, frameWireUnits[controlName]);
        newFrameWires[controlName] = event.target.value;
        setState({ frameWires: newFrameWires });
      }}
    />,
  );
}

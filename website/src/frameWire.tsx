import React from 'react';
import { nanIsZero, AppState, controlAndLabel } from './App';
import customConvert, { CustomConverter, CustomUnit } from './customConverter/customConverter';
import { FrameWireUnitName, frameWireUnits } from './customConverter/frameWire';

export type FrameWires = Record<FrameWireUnitName, string>;

export function convertToFixed<T extends CustomUnit>(
  amount: CustomConverter<CustomUnit>,
  from: T,
  to: T,
): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(4);
}

function convertFrameWire(
  event: React.ChangeEvent<HTMLInputElement>,
  from: CustomUnit,
): FrameWires {
  const amount = customConvert(nanIsZero(event), from);
  return {
    frames3Wire: convertToFixed(amount, from, frameWireUnits.frames3Wire),
    frames4Wire: convertToFixed(amount, from, frameWireUnits.frames4Wire),
    kilogramsOfWire: convertToFixed(amount, from, frameWireUnits.kilogramsOfWire),
    poundsOfWire: convertToFixed(amount, from, frameWireUnits.poundsOfWire),
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

import React from 'react';
import { nanIsZero, AppState, controlAndLabel } from './App';
import customConvert, { CustomConverter, CustomUnit } from './customConverter/customConverter';
import { FrameNailUnitName, frameNailUnits } from './customConverter/frameNails';

export type FrameNails = Record<FrameNailUnitName, string>;

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

function convertFrameNail(
  event: React.ChangeEvent<HTMLInputElement>,
  from: CustomUnit,
): FrameNails {
  const amount = customConvert(nanIsZero(event), from);
  return {
    frames30x1p4: convertToFixed(amount, from, frameNailUnits.frames30x1p4),
    frames40x1p6: convertToFixed(amount, from, frameNailUnits.frames40x1p6),
    kilogramsOfNails: convertToFixed(amount, from, frameNailUnits.kilogramsOfNails),
    nails30x1p4: convertToFixed(amount, from, frameNailUnits.nails30x1p4),
    nails40x1p6: convertToFixed(amount, from, frameNailUnits.nails40x1p6),
    poundsOfNails: convertToFixed(amount, from, frameNailUnits.poundsOfNails),
  };
}

export default function frameNailControl(
  controlName: FrameNailUnitName,
  state: AppState,
  setState: {(newState: AppState): void},
) {
  const { frameNails } = state;
  const frameNail = frameNails ? frameNails[controlName] : '';

  return controlAndLabel(
    controlName,
    frameNailUnits[controlName].label,
    <input
      type="number"
      name={controlName}
      value={frameNail}
      onChange={(event) => {
        const newFrameNails = convertFrameNail(event, frameNailUnits[controlName]);
        newFrameNails[controlName] = event.target.value;
        setState({ frameNails: newFrameNails });
      }}
    />,
  );
}

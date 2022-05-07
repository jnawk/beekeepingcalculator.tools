import React from 'react';
import { nanIsZero, AppState, controlAndLabel } from './App';
import customConvert, { customConvertToFixed, CustomUnit } from './customConverter/customConverter';
import { FrameNailUnitName, frameNailUnits } from './customConverter/frameNails';

export type FrameNails = Record<FrameNailUnitName, string>;

function convertFrameNail(
  event: React.ChangeEvent<HTMLInputElement>,
  from: CustomUnit,
): FrameNails {
  const amount = customConvert(nanIsZero(event), from);
  return {
    frames30x1p4: customConvertToFixed(amount, from, frameNailUnits.frames30x1p4),
    frames40x1p6: customConvertToFixed(amount, from, frameNailUnits.frames40x1p6),
    kilogramsOfNails: customConvertToFixed(amount, from, frameNailUnits.kilogramsOfNails),
    nails30x1p4: customConvertToFixed(amount, from, frameNailUnits.nails30x1p4),
    nails40x1p6: customConvertToFixed(amount, from, frameNailUnits.nails40x1p6),
    poundsOfNails: customConvertToFixed(amount, from, frameNailUnits.poundsOfNails),
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

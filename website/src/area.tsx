import React from 'react';
import convert, { Area } from 'convert';
import {
  nanIsZero, convertToFixed, AppState, controlAndLabel, Details,
} from './App';

// all controls are plural
type AreaControl =
  | 'squareMeters'
  | 'squareFeet'
  | 'squareYards'
  | 'hectares'
  | 'acres'

export type Areas = Record<AreaControl, string>;

interface AreaDetails extends Details {
  target: Area
}

// remember, plural
const areaLabels: Record<AreaControl, AreaDetails> = {
  acres: {
    label: 'Acres',
    target: 'acres',
  },
  hectares: {
    label: 'Hectares',
    target: 'hectares',
  },
  squareFeet: {
    label: 'Square Feet',
    target: 'square feet',
  },
  squareMeters: {
    label: 'Square Meters',
    target: 'square meters',
  },
  squareYards: {
    label: 'Square Yards',
    target: 'square yards',
  },
};

function convertArea(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Area,
): Areas {
  const amount = convert(nanIsZero(event), from);
  return {
    acres: convertToFixed(amount, from, 'acres'),
    hectares: convertToFixed(amount, from, 'hectares'),
    squareFeet: convertToFixed(amount, from, 'square feet'),
    squareMeters: convertToFixed(amount, from, 'square meters'),
    squareYards: convertToFixed(amount, from, 'square yards'),
  };
}

export default function areaControl(controlName: AreaControl, state: AppState, setState: {(newState: AppState): void}) {
  const { areas } = state;
  const area = areas ? areas[controlName] : '';

  return controlAndLabel(
    controlName,
    areaLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={area}
      onChange={(event) => {
        const newAreas = convertArea(event, areaLabels[controlName].target);
        newAreas[controlName] = event.target.value;
        setState({ areas: newAreas });
      }}
    />,
  );
}

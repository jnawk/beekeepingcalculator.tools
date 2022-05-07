import React from 'react';
import convert, { Length } from 'convert';
import {
  nanIsZero, convertToFixed, AppState, controlAndLabel,
} from './App';

// all controls are plural
type LengthControl =
  | 'meters'
  | 'centimeters'
  | 'inches'
  | 'feet'
  | 'yards'

type DistanceControl =
  | 'meters'
  | 'kilometers'
  | 'feet'
  | 'yards'
  | 'miles'

export type Lengths = Record<LengthControl, string>
export type Distances = Record<DistanceControl, string>

export interface Details {
  label: string
}

// will serve distances too
interface LengthDetails extends Details {
  target: Length
}

// remember, plural
const lengthLabels: Record<LengthControl, LengthDetails> = {
  centimeters: {
    label: 'Centimeters',
    target: 'centimeters',
  },
  feet: {
    label: 'Feet',
    target: 'feet',
  },
  inches: {
    label: 'Inches',
    target: 'inches',
  },
  meters: {
    label: 'Meters',
    target: 'meters',
  },
  yards: {
    label: 'Yards',
    target: 'yards',
  },
};

const distanceLabels: Record<DistanceControl, LengthDetails> = {
  feet: {
    label: 'Feet',
    target: 'feet',
  },
  kilometers: {
    label: 'Kilometers',
    target: 'kilometers',
  },
  meters: {
    label: 'Meters',
    target: 'meters',
  },
  miles: {
    label: 'Miles',
    target: 'miles',
  },
  yards: {
    label: 'Yards',
    target: 'yards',
  },
};

function convertLength(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Length,
): Lengths {
  const amount = convert(nanIsZero(event), from);
  return {
    centimeters: convertToFixed(amount, from, 'centimeters'),
    feet: convertToFixed(amount, from, 'feet'),
    inches: convertToFixed(amount, from, 'inches'),
    meters: convertToFixed(amount, from, 'meters'),
    yards: convertToFixed(amount, from, 'yards'),
  };
}

function convertDistance(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Length,
): Distances {
  const amount = convert(nanIsZero(event), from);
  return {
    feet: convertToFixed(amount, from, 'feet'),
    kilometers: convertToFixed(amount, from, 'kilometers'),
    meters: convertToFixed(amount, from, 'meters'),
    miles: convertToFixed(amount, from, 'miles'),
    yards: convertToFixed(amount, from, 'yards'),
  };
}

export function lengthControl(controlName: LengthControl, state: AppState, setState: {(newState: AppState): void}) {
  const { lengths } = state;
  const length = lengths ? lengths[controlName] : '';

  return controlAndLabel(
    controlName,
    lengthLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={length}
      onChange={(event) => {
        const newLengths = convertLength(event, lengthLabels[controlName].target);
        newLengths[controlName] = event.target.value;
        setState({ lengths: newLengths });
      }}
    />,
  );
}

export function distanceControl(controlName: DistanceControl, state: AppState, setState: {(newState: AppState): void}) {
  const { distances } = state;
  const distance = distances ? distances[controlName] : '';

  return controlAndLabel(
    controlName,
    distanceLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={distance}
      onChange={(event) => {
        const newDistances = convertDistance(event, distanceLabels[controlName].target);
        newDistances[controlName] = event.target.value;
        setState({ distances: newDistances });
      }}
    />,
  );
}

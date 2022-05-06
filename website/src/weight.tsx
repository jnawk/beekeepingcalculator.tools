import React from 'react';
import './App.css';
import convert, { Mass } from 'convert';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Details, nanIsZero, convertToFixed, AppState, controlAndLabel,
} from './App';

// all controls are plural
type WeightControl =
  | 'kilograms'
  | 'ounces'
  | 'pounds'
  | 'tons'
  | 'tonnes'

export type Weights = Record<WeightControl, string>;

interface WeightDetails extends Details {
  target: Mass
}

// remember, plural
const weightLabels: Record<WeightControl, WeightDetails> = {
  kilograms: {
    label: 'Kilograms',
    target: 'kilograms',
  },
  ounces: {
    label: 'Ounces',
    target: 'ounces',
  },
  pounds: {
    label: 'Pounds',
    target: 'pounds',
  },
  tonnes: {
    label: 'Tonnes',
    target: 'tonnes',
  },
  tons: {
    label: 'Tons',
    target: 'US tons',
  },
};

function convertWeight(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Mass,
): Weights {
  const amount = convert(nanIsZero(event), from);
  return {
    kilograms: convertToFixed(amount, from, 'kilograms'),
    ounces: convertToFixed(amount, from, 'ounces'),
    pounds: convertToFixed(amount, from, 'pounds'),
    tonnes: convertToFixed(amount, from, 'tonnes'),
    tons: convertToFixed(amount, from, 'US tons'),
  };
}

export default function weightControl(controlName: WeightControl, state: AppState, setState: {(newState: AppState): void}) {
  const { weights } = state;
  const weight = weights ? weights[controlName] : '';

  return controlAndLabel(
    controlName,
    weightLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={weight}
      onChange={(event) => {
        const newWeights = convertWeight(event, weightLabels[controlName].target);
        newWeights[controlName] = event.target.value;
        setState({ weights: newWeights });
      }}
    />,
  );
}

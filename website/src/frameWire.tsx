import React from 'react';
import convert from 'convert';
import {
  nanIsZero, AppState, controlAndLabel, Details,
} from './App';

// all controls are plural
export type FrameWireControl =
  | 'kilogramsOfWire'
  | 'poundsOfWire'
  | 'frames3Wire'
  | 'frames4Wire'

export type FrameWires = Record<FrameWireControl, string>;

interface FrameWireDetails extends Details {
  target: FrameWireControl,
  ratio: number
}

// remember, plural
const frameWireLabels: Record<FrameWireControl, FrameWireDetails> = {
  frames3Wire: {
    label: 'Frames (3 wire)',
    target: 'frames3Wire',
    ratio: 500,
  },
  frames4Wire: {
    label: 'Frames (4 wire)',
    target: 'frames4Wire',
    ratio: 375,
  },
  kilogramsOfWire: {
    label: 'Kilograms of wire',
    target: 'kilogramsOfWire',
    ratio: 1,
  },
  poundsOfWire: {
    label: 'Pounds of wire',
    target: 'poundsOfWire',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
};

export class CustomConverter<N extends number, T extends FrameWireControl> {
  amount: N;

  from: T;

  constructor(amount: N, from: T) {
    this.amount = amount;
    this.from = from;
  }

  to(target: T): number {
    return (this.amount * frameWireLabels[target].ratio) / frameWireLabels[this.from].ratio;
  }
}

function customConvert(
  amount: number,
  from: FrameWireControl,
): CustomConverter<number, FrameWireControl> {
  return new CustomConverter<number, FrameWireControl>(amount, from);
}

export function convertToFixed<T extends FrameWireControl>(
  amount: CustomConverter<number, T>,
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
  from: FrameWireControl,
): FrameWires {
  const amount = customConvert(nanIsZero(event), from);
  return {
    frames3Wire: convertToFixed(amount, from, 'frames3Wire'),
    frames4Wire: convertToFixed(amount, from, 'frames4Wire'),
    kilogramsOfWire: convertToFixed(amount, from, 'kilogramsOfWire'),
    poundsOfWire: convertToFixed(amount, from, 'poundsOfWire'),
  };
}

export default function frameWireControl(controlName: FrameWireControl, state: AppState, setState: {(newState: AppState): void}) {
  const { frameWires } = state;
  const frameWire = frameWires ? frameWires[controlName] : '';

  return controlAndLabel(
    controlName,
    frameWireLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={frameWire}
      onChange={(event) => {
        const newFrameWires = convertFrameWire(event, frameWireLabels[controlName].target);
        newFrameWires[controlName] = event.target.value;
        setState({ frameWires: newFrameWires });
      }}
    />,
  );
}

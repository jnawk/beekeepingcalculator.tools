import convert from 'convert';
import { CustomUnit } from './customConverter';

export type FrameWireUnitName =
  | 'frames3Wire'
  | 'frames4Wire'
  | 'kilogramsOfWire'
  | 'poundsOfWire'

export type FrameWireUnits = Record<FrameWireUnitName, CustomUnit>

export const frameWireUnits: FrameWireUnits = {
  frames3Wire: {
    label: 'Frames (3 wire)',
    ratio: 500,
  },
  frames4Wire: {
    label: 'Frames (4 wire)',
    ratio: 375,
  },
  kilogramsOfWire: {
    label: 'Kilograms of wire',
    ratio: 1,
  },
  poundsOfWire: {
    label: 'Pounds of wire',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
};

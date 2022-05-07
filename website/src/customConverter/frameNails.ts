import convert from 'convert';
import { CustomUnit, CustomUnit2 } from './customConverter';

export type FrameNailUnitName =
  | 'kilogramsOfNails'
  | 'poundsOfNails'
  | 'nails30x1p4'
  | 'nails40x1p6'
  | 'frames30x1p4'
  | 'frames40x1p6'

export type FrameNailUnits = Record<FrameNailUnitName, CustomUnit>

export const frameNailUnits: FrameNailUnits = {
  frames30x1p4: {
    label: 'Frames (30 x 1.4mm nails)',
    ratio: 433,
  },
  frames40x1p6: {
    label: 'Frames (40 x 1.6mm nails)',
    ratio: 250,
  },
  kilogramsOfNails: {
    label: 'Kilograms of nails',
    ratio: 1,
  },
  nails30x1p4: {
    label: 'Nails (30 x 1.4mm)',
    ratio: 2600,
  },
  nails40x1p6: {
    label: 'Nails (40 x 1.6mm)',
    ratio: 1500,
  },
  poundsOfNails: {
    label: 'Pounds of nails',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
};

const myFamily = 'frameNail';

export const frameNailUnits2: Array<CustomUnit2> = [
  {
    name: 'kilogramsOfNails',
    family: myFamily,
    label: 'Kilograms of nails',
    ratio: 1,
  },
  {
    name: 'poundsOfNails',
    family: myFamily,
    label: 'Pounds of nails',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
  {
    name: 'nails30x1p4',
    family: myFamily,
    label: 'Nails (30 x 1.4mm)',
    ratio: 2600,
  },
  {
    name: 'nails40x1p6',
    family: myFamily,
    label: 'Nails (40 x 1.6mm)',
    ratio: 1500,
  },
  {
    name: 'frames30x1p4',
    family: myFamily,
    label: 'Frames (30 x 1.4mm nails)',
    ratio: 433,
  },
  {
    name: 'frames40x1p6',
    family: myFamily,
    label: 'Frames (40 x 1.6mm nails)',
    ratio: 250,
  },
];

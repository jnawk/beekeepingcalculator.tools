import convert from 'convert';
import { CustomUnit } from './customConverter';

type FrameNailUnitName =
  | 'kilogramsOfNails'
  | 'poundsOfNails'
  | 'nails30x1p4'
  | 'nails40x1p6'
  | 'frames30x1p4'
  | 'frames40x1p6'

interface FrameNailUnits extends CustomUnit {
  name: FrameNailUnitName
}

const frameNailUnits: Array<FrameNailUnits> = [
  {
    name: 'kilogramsOfNails',
    label: 'Kilograms of nails',
    ratio: 1,
  },
  {
    name: 'poundsOfNails',
    label: 'Pounds of nails',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
  {
    name: 'nails30x1p4',
    label: 'Nails (30 x 1.4mm)',
    ratio: 2600,
  },
  {
    name: 'nails40x1p6',
    label: 'Nails (40 x 1.6mm)',
    ratio: 1500,
  },
  {
    name: 'frames30x1p4',
    label: 'Frames (30 x 1.4mm nails)',
    ratio: 433,
  },
  {
    name: 'frames40x1p6',
    label: 'Frames (40 x 1.6mm nails)',
    ratio: 250,
  },
];
export default frameNailUnits;

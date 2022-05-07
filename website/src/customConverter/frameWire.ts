import convert from 'convert';
import { CustomUnit } from './customConverter';

type FrameWireUnitName =
  | 'frames3Wire'
  | 'frames4Wire'
  | 'kilogramsOfWire'
  | 'poundsOfWire'

interface FrameWireUnits extends CustomUnit {
  name: FrameWireUnitName
}

const frameWireUnits: Array<FrameWireUnits> = [
  {
    name: 'kilogramsOfWire',
    label: 'Kilograms of wire',
    ratio: 1,
  },
  {
    name: 'poundsOfWire',
    label: 'Pounds of wire',
    ratio: convert(1, 'kilograms').to('pounds'),
  },
  {
    name: 'frames3Wire',
    label: 'Frames (3 wire)',
    ratio: 500,
  },
  {
    name: 'frames4Wire',
    label: 'Frames (4 wire)',
    ratio: 375,
  },
];
export default frameWireUnits;

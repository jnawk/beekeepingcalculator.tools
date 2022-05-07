import convert, { Length } from 'convert';
import { CustomUnit } from './customConverter/customConverter';

// all controls are plural
type LengthUnitName =
  | 'meters'
  | 'centimeters'
  | 'inches'
  | 'feet'
  | 'yards'

type DistanceUnitName =
  | 'meters'
  | 'kilometers'
  | 'feet'
  | 'yards'
  | 'miles'

interface LengthUnits extends CustomUnit {
  name: LengthUnitName
}

interface DistanceUnits extends CustomUnit {
  name: DistanceUnitName
}

const reference: Length = 'meters';

// remember, plural
export const lengthUnits: Array<LengthUnits> = [
  {
    name: 'meters',
    label: 'Meters',
    ratio: 1,
  },
  {
    name: 'centimeters',
    label: 'Centimeters',
    ratio: convert(1, reference).to('centimeters'),
  },
  {
    name: 'inches',
    label: 'Inches',
    ratio: convert(1, reference).to('inches'),
  },
  {
    name: 'feet',
    label: 'Feet',
    ratio: convert(1, reference).to('feet'),
  },
  {
    name: 'yards',
    label: 'Yards',
    ratio: convert(1, reference).to('yards'),
  },
];

export const distanceUnits: Array<DistanceUnits> = [
  {
    name: 'meters',
    label: 'Meters',
    ratio: 1,
  },
  {
    name: 'kilometers',
    label: 'Kilometers',
    ratio: convert(1, reference).to('kilometers'),
  },
  {
    name: 'feet',
    label: 'Feet',
    ratio: convert(1, reference).to('feet'),
  },
  {
    name: 'yards',
    label: 'Yards',
    ratio: convert(1, reference).to('yards'),
  },
  {
    name: 'miles',
    label: 'Miles',
    ratio: convert(1, reference).to('miles'),
  },
];

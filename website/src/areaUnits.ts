import convert, { Area } from 'convert';
import { CustomUnit } from './customConverter/customConverter';

// all controls are plural
type AreaUnitName =
  | 'squareMeters'
  | 'squareFeet'
  | 'squareYards'
  | 'hectares'
  | 'acres'

interface AreaUnits extends CustomUnit {
  name: AreaUnitName
}

const reference: Area = 'square meters';

// remember, plural
const areaUnits: Array<AreaUnits> = [
  {
    name: 'squareMeters',
    label: 'Square Meters',
    ratio: 1,
  },
  {
    name: 'squareFeet',
    label: 'Square Feet',
    ratio: convert(1, reference).to('square feet'),
  },
  {
    name: 'squareYards',
    label: 'Square Yards',
    ratio: convert(1, reference).to('square yards'),
  },
  {
    name: 'hectares',
    label: 'Hectares',
    ratio: convert(1, reference).to('hectares'),
  },
  {
    name: 'acres',
    label: 'Acres',
    ratio: convert(1, reference).to('acres'),
  },
];
export default areaUnits;

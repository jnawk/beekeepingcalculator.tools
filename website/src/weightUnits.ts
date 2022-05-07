import convert, { Mass } from 'convert';
import { CustomUnit } from './customConverter/customConverter';

// all controls are plural
type WeightUnitName =
  | 'kilograms'
  | 'ounces'
  | 'pounds'
  | 'tons'
  | 'tonnes'

interface WeightUnits extends CustomUnit {
  name: WeightUnitName
}

const reference: Mass = 'kilograms';

// remember, plural
const weightUnits: Array<WeightUnits> = [
  {
    name: 'kilograms',
    label: 'Kilograms',
    ratio: 1,
  },
  {
    name: 'ounces',
    label: 'Ounces',
    ratio: convert(1, reference).to('ounces'),
  },
  {
    name: 'pounds',
    label: 'Pounds',
    ratio: convert(1, reference).to('pounds'),
  },
  {
    name: 'tonnes',
    label: 'Tonnes',
    ratio: convert(1, reference).to('tonnes'),
  },
  {
    name: 'tons',
    label: 'Tons',
    ratio: convert(1, reference).to('US tons'),
  },
];
export default weightUnits;

import convert, { Mass } from 'convert';
import { CustomUnit } from './customConverter';

type SuperNailsUnitName =
  | 'kilograms'
  | 'pounds'
  | 'supers7_50x2p5'
  | 'supers8_50x2p5'
  | 'supers9_50x2p5'
  | 'supers7_60x2p8'
  | 'supers8_60x2p8'
  | 'supers9_60x2p8'

interface SuperNailsUnits extends CustomUnit {
  name: SuperNailsUnitName
}

const reference: Mass = 'kilograms';

const superNailsUnits: Array<SuperNailsUnits> = [
  {
    name: 'kilograms',
    label: 'Kilograms',
    ratio: 10,
  },
  {
    name: 'pounds',
    label: 'Pounds',
    ratio: convert(10, reference).to('pounds'),
  },
  {
    name: 'supers7_50x2p5',
    label: 'Supers (7 * 50x2.5 mm nails/corner)',
    ratio: 125,
  },
  {
    name: 'supers7_60x2p8',
    label: 'Supers (7 * 60x2.8 mm nails/corner)',
    ratio: 75,
  },
  {
    name: 'supers8_50x2p5',
    label: 'Supers (8 * 50x2.5 mm nails/corner)',
    ratio: 140,
  },
  {
    name: 'supers8_60x2p8',
    label: 'Supers (8 * 60x2.8 mm nails/corner)',
    ratio: 84,
  },
  {
    name: 'supers9_50x2p5',
    label: 'Supers (9 * 50x2.5 mm nails/corner)',
    ratio: 160,
  },
  {
    name: 'supers9_60x2p8',
    label: 'Supers (9 * 60x2.8 mm nails/corner)',
    ratio: 96,
  },
];
export default superNailsUnits;

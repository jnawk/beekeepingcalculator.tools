import convert, { Volume } from 'convert';
import { CustomUnit } from './customConverter/customConverter';

// all controls are plural
type VolumeUnitName =
  | 'litres'
  | 'fluidOunces'
  | 'usQuarts'
  | 'usGallons'
  | 'imperialGallons';

interface VolumeUnits extends CustomUnit {
  name: VolumeUnitName
}

const reference: Volume = 'litres';

// remember, plural
const volumeUnits: Array<VolumeUnits> = [
  {
    name: 'litres',
    label: 'Litres',
    ratio: 1,
  },
  {
    name: 'fluidOunces',
    label: 'Fluid Ounces',
    ratio: convert(1, reference).to('US fluid ounces'),
  },
  {
    name: 'imperialGallons',
    label: 'Imperial Gallons',
    ratio: convert(1, reference).to('imperial gallons'),
  },
  {
    name: 'usGallons',
    label: 'US Gallons',
    ratio: convert(1, reference).to('US liquid gallons'),
  },
  {
    name: 'usQuarts',
    label: 'US Quarts',
    ratio: convert(1, reference).to('US liquid quarts'),
  },
];
export default volumeUnits;

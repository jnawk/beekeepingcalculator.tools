import { CustomUnit } from './customConverter';

type FrameWiringTimeUnitName =
  | 'boxes'
  | 'frames'
  | 'minutes'
  | 'hours'
  | 'workDays'
  | 'workWeeks'

interface FrameWiringTimeUnits extends CustomUnit {
  name: FrameWiringTimeUnitName
}

const frameWiringTimeUnits: Array<FrameWiringTimeUnits> = [
  {
    name: 'boxes',
    label: 'Boxes',
    ratio: 240,
  },
  {
    name: 'frames',
    label: 'Frames',
    ratio: 2400,
  },
  {
    name: 'minutes',
    label: 'Minutes',
    ratio: 2400,
  },
  {
    name: 'hours',
    label: 'Hours',
    ratio: 40,
  },
  {
    name: 'workDays',
    label: '8 Hour Days',
    ratio: 5,
  },
  {
    name: 'workWeeks',
    label: '40 Hour Weeks',
    ratio: 1,
  },
];
export default frameWiringTimeUnits;

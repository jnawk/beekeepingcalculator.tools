import React from 'react';
import convert, { Volume } from 'convert';
import {
  AppState, controlAndLabel, Details, nanIsZero, convertToFixed,
} from './App';

// all controls are plural
type VolumeControl =
  | 'litres'
  | 'fluidOunces'
  | 'usQuarts'
  | 'usGallons'
  | 'imperialGallons';

export type Volumes = Record<VolumeControl, string>;

interface VolumeDetails extends Details {
  target: Volume;
}

// remember, plural
const volumeLabels: Record<VolumeControl, VolumeDetails> = {
  fluidOunces: {
    label: 'Fluid Ounces',
    target: 'US fluid ounces',
  },
  imperialGallons: {
    label: 'Imperial Gallons',
    target: 'imperial gallons',
  },
  litres: {
    label: 'Litres',
    target: 'litres',
  },
  usGallons: {
    label: 'US Gallons',
    target: 'US liquid gallons',
  },
  usQuarts: {
    label: 'US Quarts',
    target: 'US liquid quarts',
  },
};

function convertVolume(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Volume,
): Volumes {
  const amount = convert(nanIsZero(event), from);
  return {
    litres: convertToFixed(amount, from, 'litres'),
    fluidOunces: convertToFixed(amount, from, 'US fluid ounces'),
    usQuarts: convertToFixed(amount, from, 'US liquid quarts'),
    usGallons: convertToFixed(amount, from, 'US liquid gallons'),
    imperialGallons: convertToFixed(amount, from, 'imperial gallons'),
  };
}

export default function volumeControl(controlName: VolumeControl, state: AppState, setState: {(newState: AppState): void}) {
  const { volumes } = state;
  const volume = volumes ? volumes[controlName] : '';

  return controlAndLabel(
    controlName,
    volumeLabels[controlName].label,
    <input
      type="number"
      name={controlName}
      value={volume}
      onChange={(event) => {
        const newVolumes = convertVolume(event, volumeLabels[controlName].target);
        newVolumes[controlName] = event.target.value;
        setState({ volumes: newVolumes });
      }}
    />,
  );
}

import React from 'react';
import './App.css';
import convert, { Converter } from 'convert';

interface Volumes {
  litres?: string,
  fluidOunces?: string,
  quarts?: string,
  usGallons?: string,
  imperialGallons?: string,
}

interface AppState {
  volume?: Volumes
}

type VolumeUnits = 'litres' | 'fl. oz.' | 'quarts'

function convertToFixed(amount: Converter<number, VolumeUnits>, from: VolumeUnits, to: VolumeUnits): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(2);
}

function convertVolume(event: React.ChangeEvent<HTMLInputElement>, from: VolumeUnits): Volumes {
  let value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    value = 0;
  }
  const amount = convert(value, from);
  return {
    litres: convertToFixed(amount, from, 'litres'),
    fluidOunces: convertToFixed(amount, from, 'fl. oz.'),
    quarts: convertToFixed(amount, from, 'quarts'),
  };
}

export default class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {};
  }

  render(): React.ReactElement {
    const { volume } = this.state;

    return (
      <>
        <label htmlFor="litres">
          Litres
          {' '}
          <input
            type="number"
            name="litres"
            value={volume?.litres}
            onChange={(event) => {
              this.setState({ volume: convertVolume(event, 'litres') });
            }}
          />
        </label>

        <label htmlFor="fluidOunces">
          Fluid Ounces
          {' '}
          <input
            name="fluidOunces"
            value={volume?.fluidOunces}
            onChange={(event) => {
              this.setState({ volume: convertVolume(event, 'fl. oz.') });
            }}
          />
        </label>
      </>
    );
  }
}

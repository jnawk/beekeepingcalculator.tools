import React from 'react';
import './App.css';
import convert, { Converter, Volume } from 'convert';

interface Volumes {
  litres?: string,
  fluidOunces?: string,
  usQuarts?: string,
  usGallons?: string,
  imperialGallons?: string,
}

interface AppState {
  volume?: Volumes
}

function convertToFixed(amount: Converter<number, Volume>, from: Volume, to: Volume): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(2);
}

function convertVolume(event: React.ChangeEvent<HTMLInputElement>, from: Volume): Volumes {
  let value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    value = 0;
  }
  const amount = convert(value, from);
  return {
    litres: convertToFixed(amount, from, 'litres'),
    fluidOunces: convertToFixed(amount, from, 'fl. oz.'),
    usQuarts: convertToFixed(amount, from, 'US liquid quart'),
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

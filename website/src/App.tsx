import React from 'react';
import './App.css';
import convert, { Converter, Volume } from 'convert';
import { Col, Container, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

type VolumeControlLabel =
  | 'litres'
  | 'fluidOunces'
  | 'usQuarts'
  | 'usGallons'
  | 'imperialGallons';

type Volumes = Record<VolumeControlLabel, string>;

interface AppState {
  volume?: Volumes;
}

interface VolumeDetails {
  controlLabel: string;
  convertTarget: Volume;
}

const volumeLabels: Record<VolumeControlLabel, VolumeDetails> = {
  fluidOunces: {
    controlLabel: 'Fluid Ounces',
    convertTarget: 'fl. oz.',
  },
  imperialGallons: {
    controlLabel: 'Imperial Gallons',
    convertTarget: 'imperial gallon',
  },
  litres: {
    controlLabel: 'Litres',
    convertTarget: 'liter',
  },
  usGallons: {
    controlLabel: 'US Gallons',
    convertTarget: 'US liquid gallon',
  },
  usQuarts: {
    controlLabel: 'US Quarts',
    convertTarget: 'US liquid quart',
  },
};

function convertToFixed(
  amount: Converter<number, Volume>,
  from: Volume,
  to: Volume,
): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(2);
}

function convertVolume(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Volume,
): Volumes {
  let value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    value = 0;
  }
  const amount = convert(value, from);
  return {
    litres: convertToFixed(amount, from, 'litres'),
    fluidOunces: convertToFixed(amount, from, 'fl. oz.'),
    usQuarts: convertToFixed(amount, from, 'US liquid quart'),
    usGallons: convertToFixed(amount, from, 'US liquid gallon'),
    imperialGallons: convertToFixed(amount, from, 'imperial gallon'),
  };
}

export default class App extends React.Component<
  Record<string, never>,
  AppState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {};
  }

  volumeControl(controlName: VolumeControlLabel) {
    const { volume: volumes } = this.state;
    const volume = volumes ? volumes[controlName] : undefined;

    return (
      <Col xs={1}>
        <label htmlFor={controlName}>
          {volumeLabels[controlName].controlLabel}
          <input
            type="number"
            name={controlName}
            value={volume}
            onChange={(event) => {
              this.setState({ volume: convertVolume(event, volumeLabels[controlName].convertTarget) });
            }}
          />
        </label>
      </Col>
    );
  }

  render(): React.ReactElement {
    return (
      <Container fluid>
        <Row>
          {this.volumeControl('litres')}
          {this.volumeControl('fluidOunces')}
          {this.volumeControl('usQuarts')}
          {this.volumeControl('usGallons')}
          {this.volumeControl('imperialGallons')}
        </Row>
      </Container>
    );
  }
}

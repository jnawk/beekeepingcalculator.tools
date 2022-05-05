import React from 'react';
import './App.css';
import convert, { Converter, Volume } from 'convert';
import { Col, Container, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

type VolumeControl =
  | 'litres'
  | 'fluidOunces'
  | 'usQuarts'
  | 'usGallons'
  | 'imperialGallons';


interface AppState {
  volume?: Volumes;
}
type Volumes = Record<VolumeControl, string>;

interface VolumeDetails {
  controlLabel: string;
  convertTarget: Volume;
}

const volumeLabels: Record<VolumeControl, VolumeDetails> = {
  fluidOunces: {
    controlLabel: 'Fluid Ounces',
    convertTarget: 'US fluid ounces',
  },
  imperialGallons: {
    controlLabel: 'Imperial Gallons',
    convertTarget: 'imperial gallons',
  },
  litres: {
    controlLabel: 'Litres',
    convertTarget: 'liters',
  },
  usGallons: {
    controlLabel: 'US Gallons',
    convertTarget: 'US liquid gallons',
  },
  usQuarts: {
    controlLabel: 'US Quarts',
    convertTarget: 'US liquid quarts',
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
  return amount.to(to).toFixed(4);
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
    fluidOunces: convertToFixed(amount, from, 'US fluid ounces'),
    usQuarts: convertToFixed(amount, from, 'US liquid quarts'),
    usGallons: convertToFixed(amount, from, 'US liquid gallons'),
    imperialGallons: convertToFixed(amount, from, 'imperial gallons'),
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

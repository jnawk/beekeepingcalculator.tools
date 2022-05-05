import React from 'react';
import './App.css';
import convert, { Converter, Volume, Mass } from 'convert';
import { Col, Container, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

type VolumeControl =
  | 'litres'
  | 'fluidOunces'
  | 'usQuarts'
  | 'usGallons'
  | 'imperialGallons';

type WeightControl =
  | 'kilograms'
  | 'ounces'
  | 'pounds'
  | 'tons'
  | 'tonnes'

type Volumes = Record<VolumeControl, string>;
type Weights = Record<WeightControl, string>;

interface VolumeDetails {
  controlLabel: string;
  convertTarget: Volume;
}

interface WeightDetails {
  controlLabel: string;
  convertTarget: Mass
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

const weightLabels: Record<WeightControl, WeightDetails> = {
  kilograms: {
    controlLabel: 'Kilograms',
    convertTarget: 'kilograms',
  },
  ounces: {
    controlLabel: 'Ounces',
    convertTarget: 'ounces',
  },
  pounds: {
    controlLabel: 'Pounds',
    convertTarget: 'pounds',
  },
  tonnes: {
    controlLabel: 'Tonnes',
    convertTarget: 'tonnes',
  },
  tons: {
    controlLabel: 'Tons',
    convertTarget: 'US tons',
  },
};
interface AppState {
  volumes?: Volumes;
  weights?: Weights
}

function convertToFixed<T extends Volume | Mass>(
  amount: Converter<number, T>,
  from: T,
  to: T,
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

function convertWeight(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Mass,
): Weights {
  let value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    value = 0;
  }
  const amount = convert(value, from);
  return {
    kilograms: convertToFixed(amount, from, 'kilograms'),
    ounces: convertToFixed(amount, from, 'ounces'),
    pounds: convertToFixed(amount, from, 'pounds'),
    tonnes: convertToFixed(amount, from, 'tonnes'),
    tons: convertToFixed(amount, from, 'US tons'),
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

  weightControl(controlName: WeightControl) {
    const { weights } = this.state;
    const weight = weights ? weights[controlName] : undefined;

    return (
      <Col xs={1}>
        <label htmlFor={controlName}>
          {weightLabels[controlName].controlLabel}
          <input
            type="number"
            name={controlName}
            value={weight}
            onChange={(event) => {
              this.setState({ weights: convertWeight(event, weightLabels[controlName].convertTarget) });
            }}
          />
        </label>
      </Col>
    );
  }

  volumeControl(controlName: VolumeControl) {
    const { volumes } = this.state;
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
              this.setState({ volumes: convertVolume(event, volumeLabels[controlName].convertTarget) });
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

        <Row>
          {this.weightControl('kilograms')}
          {this.weightControl('ounces')}
          {this.weightControl('pounds')}
          {this.weightControl('tons')}
          {this.weightControl('tonnes')}
        </Row>
      </Container>
    );
  }
}

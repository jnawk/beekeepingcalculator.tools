import React from 'react';
import './App.css';
import convert, {
  Converter, Volume, Mass, Length, Area,
} from 'convert';
import {
  Col, Container, Row, UncontrolledAccordion, AccordionHeader, AccordionItem, AccordionBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

// all controls are plural
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

type LengthControl =
  | 'meters'
  | 'centimeters'
  | 'inches'
  | 'feet'
  | 'yards'

type DistanceControl =
  | 'meters'
  | 'kilometers'
  | 'feet'
  | 'yards'
  | 'miles'

type AreaControl =
  | 'squareMeters'
  | 'squareFeet'
  | 'squareYards'
  | 'hectares'
  | 'acres'

type Volumes = Record<VolumeControl, string>;
type Weights = Record<WeightControl, string>;
type Lengths = Record<LengthControl, string>
type Distances = Record<DistanceControl, string>
type Areas = Record<AreaControl, string>;

interface Details {
  label: string
}

interface VolumeDetails extends Details {
  target: Volume;
}

interface WeightDetails extends Details {
  target: Mass
}

// will serve distances too
interface LengthDetails extends Details {
  target: Length
}

interface AreaDetails extends Details {
  target: Area
}

interface AppState {
  volumes?: Volumes;
  weights?: Weights;
  lengths?: Lengths;
  distances?: Distances;
  areas?: Areas;
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

const weightLabels: Record<WeightControl, WeightDetails> = {
  kilograms: {
    label: 'Kilograms',
    target: 'kilograms',
  },
  ounces: {
    label: 'Ounces',
    target: 'ounces',
  },
  pounds: {
    label: 'Pounds',
    target: 'pounds',
  },
  tonnes: {
    label: 'Tonnes',
    target: 'tonnes',
  },
  tons: {
    label: 'Tons',
    target: 'US tons',
  },
};

const lengthLabels: Record<LengthControl, LengthDetails> = {
  centimeters: {
    label: 'Centimeters',
    target: 'centimeters',
  },
  feet: {
    label: 'Feet',
    target: 'feet',
  },
  inches: {
    label: 'Inches',
    target: 'inches',
  },
  meters: {
    label: 'Meters',
    target: 'meters',
  },
  yards: {
    label: 'Yards',
    target: 'yards',
  },
};

const distanceLabels: Record<DistanceControl, LengthDetails> = {
  feet: {
    label: 'Feet',
    target: 'feet',
  },
  kilometers: {
    label: 'Kilometers',
    target: 'kilometers',
  },
  meters: {
    label: 'Meters',
    target: 'meters',
  },
  miles: {
    label: 'Miles',
    target: 'miles',
  },
  yards: {
    label: 'Yards',
    target: 'yards',
  },
};

const areaLabels: Record<AreaControl, AreaDetails> = {
  acres: {
    label: 'Acres',
    target: 'acres',
  },
  hectares: {
    label: 'Hectares',
    target: 'hectares',
  },
  squareFeet: {
    label: 'Square Feet',
    target: 'square feet',
  },
  squareMeters: {
    label: 'Square Meters',
    target: 'square meters',
  },
  squareYards: {
    label: 'Square Yards',
    target: 'square yards',
  },
};

function nanIsZero(event: React.ChangeEvent<HTMLInputElement>): number {
  const value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

function convertToFixed<T extends Volume | Mass | Length | Area>(
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
  const amount = convert(nanIsZero(event), from);
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
  const amount = convert(nanIsZero(event), from);
  return {
    kilograms: convertToFixed(amount, from, 'kilograms'),
    ounces: convertToFixed(amount, from, 'ounces'),
    pounds: convertToFixed(amount, from, 'pounds'),
    tonnes: convertToFixed(amount, from, 'tonnes'),
    tons: convertToFixed(amount, from, 'US tons'),
  };
}

function convertLength(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Length,
): Lengths {
  const amount = convert(nanIsZero(event), from);
  return {
    centimeters: convertToFixed(amount, from, 'centimeters'),
    feet: convertToFixed(amount, from, 'feet'),
    inches: convertToFixed(amount, from, 'inches'),
    meters: convertToFixed(amount, from, 'meters'),
    yards: convertToFixed(amount, from, 'yards'),
  };
}

function convertDistance(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Length,
): Distances {
  const amount = convert(nanIsZero(event), from);
  return {
    feet: convertToFixed(amount, from, 'feet'),
    kilometers: convertToFixed(amount, from, 'kilometers'),
    meters: convertToFixed(amount, from, 'meters'),
    miles: convertToFixed(amount, from, 'miles'),
    yards: convertToFixed(amount, from, 'yards'),
  };
}

function convertArea(
  event: React.ChangeEvent<HTMLInputElement>,
  from: Area,
): Areas {
  const amount = convert(nanIsZero(event), from);
  return {
    acres: convertToFixed(amount, from, 'acres'),
    hectares: convertToFixed(amount, from, 'hectares'),
    squareFeet: convertToFixed(amount, from, 'square feet'),
    squareMeters: convertToFixed(amount, from, 'square meters'),
    squareYards: convertToFixed(amount, from, 'square yards'),
  };
}

function controlAndLabel(controlName: string, label: string, inputElement: JSX.Element) {
  return (
    <Col xs={12} md={1}>
      <Row>
        <label htmlFor={controlName}>
          <Col xs={12}>
            {label}
          </Col>
          <Col xs={12}>
            {inputElement}
          </Col>
        </label>
      </Row>
    </Col>
  );
}

export default class App extends React.Component<
  Record<string, never>,
  AppState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {};
  }

  volumeControl(controlName: VolumeControl) {
    const { volumes } = this.state;
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
          this.setState({ volumes: newVolumes });
        }}
      />,
    );
  }

  weightControl(controlName: WeightControl) {
    const { weights } = this.state;
    const weight = weights ? weights[controlName] : '';

    return controlAndLabel(
      controlName,
      weightLabels[controlName].label,
      <input
        type="number"
        name={controlName}
        value={weight}
        onChange={(event) => {
          const newWeights = convertWeight(event, weightLabels[controlName].target);
          newWeights[controlName] = event.target.value;
          this.setState({ weights: newWeights });
        }}
      />,
    );
  }

  lengthControl(controlName: LengthControl) {
    const { lengths } = this.state;
    const length = lengths ? lengths[controlName] : '';

    return controlAndLabel(
      controlName,
      lengthLabels[controlName].label,
      <input
        type="number"
        name={controlName}
        value={length}
        onChange={(event) => {
          const newLengths = convertLength(event, lengthLabels[controlName].target);
          newLengths[controlName] = event.target.value;
          this.setState({ lengths: newLengths });
        }}
      />,
    );
  }

  distanceControl(controlName: DistanceControl) {
    const { distances } = this.state;
    const distance = distances ? distances[controlName] : '';

    return controlAndLabel(
      controlName,
      distanceLabels[controlName].label,
      <input
        type="number"
        name={controlName}
        value={distance}
        onChange={(event) => {
          const newDistances = convertDistance(event, distanceLabels[controlName].target);
          newDistances[controlName] = event.target.value;
          this.setState({ distances: newDistances });
        }}
      />,
    );
  }

  areaControl(controlName: AreaControl) {
    const { areas } = this.state;
    const area = areas ? areas[controlName] : '';

    return controlAndLabel(
      controlName,
      areaLabels[controlName].label,
      <input
        type="number"
        name={controlName}
        value={area}
        onChange={(event) => {
          const newAreas = convertArea(event, areaLabels[controlName].target);
          newAreas[controlName] = event.target.value;
          this.setState({ areas: newAreas });
        }}
      />,
    );
  }

  render(): React.ReactElement {
    return (
      <Container fluid>
        <UncontrolledAccordion defaultOpen={['1', '2', '3', '4', '5']} stayOpen open={['1', '2', '3', '4', '5']}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              Volume
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <Row>
                {this.volumeControl('litres')}
                {this.volumeControl('fluidOunces')}
                {this.volumeControl('usQuarts')}
                {this.volumeControl('usGallons')}
                {this.volumeControl('imperialGallons')}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="2">
              Weight
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <Row>
                {this.weightControl('kilograms')}
                {this.weightControl('ounces')}
                {this.weightControl('pounds')}
                {this.weightControl('tons')}
                {this.weightControl('tonnes')}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="3">
              Length
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <Row>
                {this.lengthControl('meters')}
                {this.lengthControl('centimeters')}
                {this.lengthControl('inches')}
                {this.lengthControl('feet')}
                {this.lengthControl('yards')}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="4">
              Distance
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <Row>
                {this.distanceControl('meters')}
                {this.distanceControl('kilometers')}
                {this.distanceControl('feet')}
                {this.distanceControl('yards')}
                {this.distanceControl('miles')}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="5">
              Area
            </AccordionHeader>
            <AccordionBody accordionId="5">
              <Row>
                {this.areaControl('squareMeters')}
                {this.areaControl('squareFeet')}
                {this.areaControl('squareYards')}
                {this.areaControl('hectares')}
                {this.areaControl('acres')}
              </Row>
            </AccordionBody>
          </AccordionItem>

        </UncontrolledAccordion>
      </Container>
    );
  }
}

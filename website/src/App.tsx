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

  render(): React.ReactElement {
    const { volume } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col xs={1}>
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
          </Col>
          <Col xs={1}>
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
          </Col>
          <Col xs={1}>
            <label htmlFor="usQuarts">
              US Quarts
              {' '}
              <input
                name="usQuarts"
                value={volume?.usQuarts}
                onChange={(event) => {
                  this.setState({ volume: convertVolume(event, 'US liquid quart') });
                }}
              />
            </label>
          </Col>
          <Col xs={1}>
            <label htmlFor="usGallons">
              US Gallons
              {' '}
              <input
                name="usGallons"
                value={volume?.usGallons}
                onChange={(event) => {
                  this.setState({ volume: convertVolume(event, 'US liquid gallon') });
                }}
              />
            </label>
          </Col>
          <Col xs={1}>
            <label htmlFor="imperialGallons">
              Imperial Gallons
              {' '}
              <input
                name="imperialGallons"
                value={volume?.imperialGallons}
                onChange={(event) => {
                  this.setState({ volume: convertVolume(event, 'imperial gallon') });
                }}
              />
            </label>
          </Col>
        </Row>
      </Container>
    );
  }
}

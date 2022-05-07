import React from 'react';
import './App.css';
import {
  Col, Container, Row, UncontrolledAccordion,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { distanceUnits, lengthUnits } from './lengthUnits';
import frameNailUnits from './customConverter/frameNails';
import frameWireUnits from './customConverter/frameWire';
import GenericControl from './customConverter/genericComponent';
import volumeUnits from './volumeUnits';
import weightUnits from './weightUnits';
import areaUnits from './areaUnits';

export function nanIsZero(event: React.ChangeEvent<HTMLInputElement>): number {
  const value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

export function controlAndLabel(controlName: string, label: string, inputElement: JSX.Element) {
  return (
    <Col xs={12} lg={3} xxl={2}>
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
  Record<string, never>
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {};
  }

  render(): React.ReactElement {
    const items = [1, 2, 3, 4, 5, 6, 7].map((x) => x.toString());
    return (
      <Container fluid>
        <UncontrolledAccordion
          defaultOpen={items}
          open={items}
          stayOpen
        >
          <GenericControl units={volumeUnits} heading="Volume" id="1" />
          <GenericControl units={weightUnits} heading="Weight" id="2" />
          <GenericControl units={lengthUnits} heading="Length" id="3" />
          <GenericControl units={distanceUnits} heading="Distance" id="4" />
          <GenericControl units={areaUnits} heading="Distance" id="5" />

          <GenericControl units={frameWireUnits} heading="Frame Wires" id="6" />
          <GenericControl units={frameNailUnits} heading="Frame Nails" id="7" />

        </UncontrolledAccordion>
      </Container>
    );
  }
}

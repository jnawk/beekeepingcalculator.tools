import React from 'react';
import './App.css';
import {
  Converter, Volume, Mass, Length, Area,
} from 'convert';
import {
  Col, Container, Row, UncontrolledAccordion, AccordionHeader, AccordionItem, AccordionBody,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import volumeControl, { Volumes } from './volume';
import weightControl, { Weights } from './weight';
import {
  distanceControl, Distances, lengthControl, Lengths,
} from './length';
import areaControl, { Areas } from './area';
import frameWireControl, { FrameWires } from './frameWire';

export interface Details {
  label: string
}

export interface AppState {
  volumes?: Volumes;
  weights?: Weights;
  lengths?: Lengths;
  distances?: Distances;
  areas?: Areas;
  frameWires?: FrameWires;
}

export function nanIsZero(event: React.ChangeEvent<HTMLInputElement>): number {
  const value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

export function convertToFixed<T extends Volume | Mass | Length | Area>(
  amount: Converter<number, T>,
  from: T,
  to: T,
): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(4);
}

export function controlAndLabel(controlName: string, label: string, inputElement: JSX.Element) {
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

  render(): React.ReactElement {
    const rest: [AppState, {(newState: AppState): void}] = [this.state, (x: AppState) => this.setState(x)];
    return (
      <Container fluid>
        <UncontrolledAccordion
          defaultOpen={['1', '2', '3', '4', '5', '6']}
          open={['1', '2', '3', '4', '5', '6']}
          stayOpen
        >
          <AccordionItem>
            <AccordionHeader targetId="1">
              Volume
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <Row>
                {volumeControl('litres', ...rest)}
                {volumeControl('fluidOunces', ...rest)}
                {volumeControl('usQuarts', ...rest)}
                {volumeControl('usGallons', ...rest)}
                {volumeControl('imperialGallons', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="2">
              Weight
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <Row>
                {weightControl('kilograms', ...rest)}
                {weightControl('ounces', ...rest)}
                {weightControl('pounds', ...rest)}
                {weightControl('tons', ...rest)}
                {weightControl('tonnes', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="3">
              Length
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <Row>
                {lengthControl('meters', ...rest)}
                {lengthControl('centimeters', ...rest)}
                {lengthControl('inches', ...rest)}
                {lengthControl('feet', ...rest)}
                {lengthControl('yards', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="4">
              Distance
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <Row>
                {distanceControl('meters', ...rest)}
                {distanceControl('kilometers', ...rest)}
                {distanceControl('feet', ...rest)}
                {distanceControl('yards', ...rest)}
                {distanceControl('miles', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="5">
              Area
            </AccordionHeader>
            <AccordionBody accordionId="5">
              <Row>
                {areaControl('squareMeters', ...rest)}
                {areaControl('squareFeet', ...rest)}
                {areaControl('squareYards', ...rest)}
                {areaControl('hectares', ...rest)}
                {areaControl('acres', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="6">
              Frame Wires
            </AccordionHeader>
            <AccordionBody accordionId="6">
              <Row>
                {frameWireControl('kilogramsOfWire', ...rest)}
                {frameWireControl('poundsOfWire', ...rest)}
                {frameWireControl('frames3Wire', ...rest)}
                {frameWireControl('frames4Wire', ...rest)}
              </Row>
            </AccordionBody>
          </AccordionItem>

        </UncontrolledAccordion>
      </Container>
    );
  }
}

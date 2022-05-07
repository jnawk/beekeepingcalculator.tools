import React from 'react';
import {
  AccordionItem, AccordionHeader, AccordionBody, Row, Col,
} from 'reactstrap';
import customConvert, { CustomUnit, convertToFixed } from './customConverter/customConverter';

function nanIsZero(event: React.ChangeEvent<HTMLInputElement>): number {
  const value = parseFloat(event.target.value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

function genericConvert(
  event: React.ChangeEvent<HTMLInputElement>,
  units: Array<CustomUnit>,
  from: CustomUnit,
): Array<UnitState> {
  const amount = customConvert(nanIsZero(event), from);
  return units.map((unit) => ({
    unit,
    value: convertToFixed(amount, from, unit),
  }));
}

interface UnitState {
  value: string,
  unit: CustomUnit
}

interface ControlProps {
  units: Array<CustomUnit>,
  heading: string,
  id: string,
}

interface ControlState {
  state: Array<UnitState>
}

export default class GenericControl extends React.Component<
  ControlProps,
  ControlState
> {
  constructor(props: ControlProps) {
    super(props);
    this.state = {
      state: props.units.map((unit) => ({
        value: '',
        unit,
      })),
    };
  }

  genericControl(
    controlName: string,
    units: Array<CustomUnit>,
  ) {
    const { state } = this.state;
    const item = state.find((value) => value.unit.name === controlName);
    const label = units.find((value) => value.name === controlName)?.label;

    if (item === undefined || label === undefined) return undefined;

    const value = item?.value;
    const unit = item?.unit;

    const inputElement = (
      <input
        type="number"
        name={controlName}
        value={value}
        onChange={(event) => {
          this.setState({ state: genericConvert(event, units, unit) });
        }}
      />
    );

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

  render(): React.ReactElement {
    const { units, heading, id } = this.props;

    return (
      <AccordionItem>
        <AccordionHeader targetId={id}>
          {heading}
        </AccordionHeader>
        <AccordionBody accordionId={id}>
          <Row>
            {units.map((unit) => this.genericControl(
              unit.name,
              units,
            ))}
          </Row>
        </AccordionBody>
      </AccordionItem>
    );
  }
}

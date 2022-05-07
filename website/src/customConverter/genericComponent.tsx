import React from 'react';
import {
  AccordionItem, AccordionHeader, AccordionBody, Row,
} from 'reactstrap';
import { controlAndLabel, nanIsZero } from '../App';
import customConvert, { CustomUnit, customConvertToFixed } from './customConverter';

export interface UnitState {
  value: string,
  unit: CustomUnit
}

function genericConvert(
  event: React.ChangeEvent<HTMLInputElement>,
  units: Array<CustomUnit>,
  from: CustomUnit,
): Array<UnitState> {
  const amount = customConvert(nanIsZero(event), from);
  return units.map((unit) => ({
    unit,
    value: customConvertToFixed(amount, from, unit),
  }));
}

interface ControlState {
  state: Array<UnitState>
}

interface ControlProps {
  units: Array<CustomUnit>,
  heading: string
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

    return controlAndLabel(
      controlName,
      label,
      <input
        type="number"
        name={controlName}
        value={value}
        onChange={(event) => {
          this.setState({ state: genericConvert(event, units, unit) });
        }}
      />,
    );
  }

  render(): React.ReactElement {
    const { units, heading } = this.props;

    return (
      <AccordionItem>
        <AccordionHeader targetId="7">
          {heading}
        </AccordionHeader>
        <AccordionBody accordionId="7">
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

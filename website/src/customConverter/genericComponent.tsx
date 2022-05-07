import React from 'react';
import {
  AccordionItem, AccordionHeader, AccordionBody, Row,
} from 'reactstrap';
import { controlAndLabel, nanIsZero } from '../App';
import customConvert, { CustomUnit2, customConvertToFixed } from './customConverter';

export interface UnitState {
  value: string,
  unit: CustomUnit2
}

function genericConvert(
  event: React.ChangeEvent<HTMLInputElement>,
  units: Array<CustomUnit2>,
  from: CustomUnit2,
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
  units: Array<CustomUnit2>,
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
    units: Array<CustomUnit2>,
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

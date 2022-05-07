import React from 'react';
import {
  AccordionItem, AccordionHeader, AccordionBody, Row,
} from 'reactstrap';
import { controlAndLabel, nanIsZero } from '../App';
import { FrameNailUnitName } from './frameNails';
import { FrameWireUnitName } from './frameWire';

export type UnitFamily =
  | 'frameWire'
  | 'frameNail'

export type UnitName =
  | FrameWireUnitName
  | FrameNailUnitName

export type CustomUnit = {
  ratio: number;
  label: string;
}

export interface UnitState {
  value: string,
  unit: CustomUnit2
}

export interface CustomUnit2 extends CustomUnit {
  family: string,
  name: string,
}

export class CustomConverter<T extends CustomUnit> {
  amount: number;

  from: T;

  constructor(amount: number, from: T) {
    this.amount = amount;
    this.from = from;
  }

  to(target: T): number {
    return (this.amount * target.ratio) / this.from.ratio;
  }
}

export function customConvertToFixed<T extends CustomUnit>(
  amount: CustomConverter<CustomUnit>,
  from: T,
  to: T,
): string {
  if (from === to) {
    return amount.to(to).toString();
  }
  return amount.to(to).toFixed(4);
}

export default function customConvert<T extends CustomUnit>(
  amount: number,
  from: T,
): CustomConverter<T> {
  return new CustomConverter<T>(amount, from);
}

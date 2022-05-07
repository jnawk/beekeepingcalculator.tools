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

export default function customConvert<T extends CustomUnit>(
  amount: number,
  from: T,
): CustomConverter<T> {
  return new CustomConverter<T>(amount, from);
}

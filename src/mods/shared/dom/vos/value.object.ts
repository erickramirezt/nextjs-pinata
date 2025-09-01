import { UnprocessableEntityError } from "../errs/unprocessable.entity.error";

type Primitives = string | number | boolean | Date;
type Optional<T> = T | undefined | null;

export abstract class ValueObject<T extends Primitives> {
  private readonly valueObject: T;

  constructor({ valueObject }: { valueObject: T }) {
    this.validateValueObject({
      valueObject,
    });

    this.valueObject = valueObject;
  }

  equals({ other }: { other: ValueObject<T> }): boolean {
    return (
      this.valueObject === other.valueObject &&
      this.constructor.name === other.constructor.name
    );
  }

  toString(): string {
    return this.valueObject.toString();
  }

  private isValueObjectValid({
    valueObject,
  }: {
    valueObject: Optional<T>;
  }): boolean {
    return valueObject !== undefined && valueObject !== null;
  }

  private validateValueObject({
    valueObject,
  }: {
    valueObject: Optional<T>;
  }): void {
    if (!this.isValueObjectValid({ valueObject })) {
      throw new InvalidValueObjectError({
        valueObject: String(valueObject),
      });
    }
  }
}

export class InvalidValueObjectError extends UnprocessableEntityError {
  constructor({ valueObject }: { valueObject: string }) {
    super(
      InvalidValueObjectError.message({
        valueObject,
      })
    );
  }

  static message({ valueObject }: { valueObject: string }): string {
    return `El valor [${valueObject}] no es un valor válido.`;
  }

  static staticMessage: string = "El valor ingresado no es válido.";
}

import { UnprocessableEntityError } from "../errs/unprocessable.entity.error";
import { ValueObject } from "./value.object";

export class NumberValueObject extends ValueObject<number> {
  readonly numberValueObject: number;

  constructor({ numberValueObject }: { numberValueObject: number }) {
    super({ valueObject: numberValueObject });
    this.validateNumberValueObject({
      numberValueObject,
    });
    this.numberValueObject = numberValueObject;
  }

  private validateNumberValueObject({
    numberValueObject,
  }: {
    numberValueObject: number;
  }): void {
    if (!this.isNumberValueObjectValid({ numberValueObject })) {
      throw new InvalidNumberValueObjectError({
        numberValueObject: String(numberValueObject),
      });
    }
  }

  private isNumberValueObjectValid({
    numberValueObject,
  }: {
    numberValueObject: number;
  }): boolean {
    return typeof numberValueObject === "number";
  }
}

export class InvalidNumberValueObjectError extends UnprocessableEntityError {
  constructor({ numberValueObject }: { numberValueObject: string }) {
    super(
      InvalidNumberValueObjectError.message({
        numberValueObject: String(numberValueObject),
      })
    );
  }

  static message({ numberValueObject }: { numberValueObject: string }): string {
    return `El valor [${numberValueObject}] no es un número válido.`;
  }

  static staticMessage: string = "El valor ingresado no es un número válido.";
}

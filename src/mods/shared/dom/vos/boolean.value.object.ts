import { UnprocessableEntityError } from "../errs/unprocessable.entity.error";
import { ValueObject } from "./value.object";

export class BooleanValueObject extends ValueObject<boolean> {
  readonly booleanValueObject: boolean;

  constructor({ booleanValueObject }: { booleanValueObject: boolean }) {
    super({ valueObject: booleanValueObject });
    this.validateBooleanValueObject({
      booleanValueObject,
    });
    this.booleanValueObject = booleanValueObject;
  }

  private validateBooleanValueObject({
    booleanValueObject,
  }: {
    booleanValueObject: boolean;
  }): void {
    if (!this.isBooleanValueObjectValid({ booleanValueObject })) {
      throw new InvalidBooleanValueObjectError({
        booleanValueObject: String(booleanValueObject),
      });
    }
  }

  private isBooleanValueObjectValid({
    booleanValueObject,
  }: {
    booleanValueObject: boolean;
  }): boolean {
    return typeof booleanValueObject === "boolean";
  }
}

export class InvalidBooleanValueObjectError extends UnprocessableEntityError {
  constructor({ booleanValueObject }: { booleanValueObject: string }) {
    super(
      InvalidBooleanValueObjectError.message({
        booleanValueObject,
      })
    );
  }

  static message({
    booleanValueObject,
  }: {
    booleanValueObject: string;
  }): string {
    return `El valor [${booleanValueObject}] no es un booleano válido.`;
  }

  static staticMessage: string = "El valor ingresado no es un booleano válido.";
}

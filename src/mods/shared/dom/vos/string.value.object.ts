import { UnprocessableEntityError } from "../errs/unprocessable.entity.error";
import { ValueObject } from "./value.object";

export class StringValueObject extends ValueObject<string> {
  readonly stringValueObject: string;

  constructor({ stringValueObject }: { stringValueObject: string }) {
    super({ valueObject: stringValueObject });
    this.validateStringValueObject({
      stringValueObject,
    });
    this.stringValueObject = stringValueObject;
  }

  private validateStringValueObject({
    stringValueObject,
  }: {
    stringValueObject: string;
  }): void {
    if (!this.isStringValueObjectValid({ stringValueObject })) {
      throw new InvalidStringValueObjectError({
        stringValueObject,
      });
    }
  }

  private isStringValueObjectValid({
    stringValueObject,
  }: {
    stringValueObject: string;
  }): boolean {
    return typeof stringValueObject === "string";
  }
}

export class InvalidStringValueObjectError extends UnprocessableEntityError {
  constructor({ stringValueObject }: { stringValueObject: string }) {
    super(
      InvalidStringValueObjectError.message({
        stringValueObject,
      })
    );
  }

  static message({ stringValueObject }: { stringValueObject: string }): string {
    return `El valor [${stringValueObject}] no es una cadena de texto válida.`;
  }

  static staticMessage: string =
    "El valor ingresado no es una cadena de texto válida.";
}

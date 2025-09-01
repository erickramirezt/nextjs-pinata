import { UnprocessableEntityError } from "../errs/unprocessable.entity.error";
import { ValueObject } from "./value.object";

export class DateValueObject extends ValueObject<Date> {
  readonly dateValueObject: Date;

  constructor({ dateValueObject }: { dateValueObject: Date }) {
    super({ valueObject: dateValueObject });
    this.validateDateValueObject({
      dateValueObject,
    });
    this.dateValueObject = dateValueObject;
  }

  static now(): DateValueObject {
    return new DateValueObject({
      dateValueObject: new Date(),
    });
  }

  private validateDateValueObject({
    dateValueObject,
  }: {
    dateValueObject: Date;
  }): void {
    if (!this.isDateValueObjectValid({ dateValueObject })) {
      throw new InvalidDateValueObjectError({
        dateValueObject: String(dateValueObject),
      });
    }
  }

  private isDateValueObjectValid({
    dateValueObject,
  }: {
    dateValueObject: Date;
  }): boolean {
    return dateValueObject instanceof Date;
  }
}

export class InvalidDateValueObjectError extends UnprocessableEntityError {
  constructor({ dateValueObject }: { dateValueObject: string }) {
    super(
      InvalidDateValueObjectError.message({
        dateValueObject,
      })
    );
  }

  static message({ dateValueObject }: { dateValueObject: string }): string {
    return `El valor [${dateValueObject}] no es una fecha válida.`;
  }

  static staticMessage: string = "El valor ingresado no es una fecha válida.";
}

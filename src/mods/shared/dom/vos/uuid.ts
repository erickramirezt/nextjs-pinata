import { InternalServerError } from '../errs/internal.server.error'
import { StringValueObject } from './string.value.object'

export class Uuid extends StringValueObject {
  readonly uuid: string

  static readonly validUuidRegex: RegExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  constructor({ uuid }: { uuid: string }) {
    super({ stringValueObject: uuid })

    this.validateUuid({
      uuid
    })
    this.uuid = uuid
  }

  private validateUuid({ uuid }: { uuid: string }): void {
    if (!this.isUuidValid({ uuid })) {
      throw new InvalidUuidError({
        uuid
      })
    }
  }

  private isUuidValid({ uuid }: { uuid: string }): boolean {
    return Uuid.validUuidRegex.test(uuid)
  }

  static generate(): Uuid {
    return new Uuid({
      uuid: crypto.randomUUID()
    })
  }
}

export class InvalidUuidError extends InternalServerError {
  constructor({ uuid }: { uuid: string }) {
    super(
      InvalidUuidError.message({
        uuid
      })
    )
  }

  static message({ uuid }: { uuid: string }): string {
    return `El valor [${uuid}] no es un UUID válido.`
  }

  static staticMessage: string = 'El valor ingresado no es un UUID válido.'
}

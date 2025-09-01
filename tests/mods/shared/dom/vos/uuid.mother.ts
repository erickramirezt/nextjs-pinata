import { Uuid } from '../../../../../src/mods/shared/dom/vos/uuid'
import { MotherCreator } from './mother.creator'

export const UuidMother = {
  create({ uuid }: { uuid?: string }): Uuid {
    return new Uuid({
      uuid: uuid ?? MotherCreator.string.uuid()
    })
  },

  createInvalid(): string {
    return MotherCreator.string.word({
      max: 10,
      min: 1
    })
  }
}

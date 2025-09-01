import { faker } from '@faker-js/faker'

export const MotherCreator = {
  string: {
    uuid(): string {
      return faker.string.uuid()
    },
    word({ min, max }: { min: number; max: number }): string {
      return faker.string.alphanumeric({
        length: {
          max,
          min
        }
      })
    },
    email(): string {
      return faker.internet.email()
    },
    userAgent(): string {
      return faker.internet.userAgent()
    },
    personName(): string {
      return faker.person.fullName()
    },
    fromArray({ array }: { array: string[] }): string {
      return faker.helpers.arrayElement(array)
    }
  },
  boolean: {
    random(): boolean {
      return faker.datatype.boolean()
    }
  },
  date: {
    anytime(): Date {
      return faker.date.anytime()
    },
    recent(): Date {
      return faker.date.recent()
    },
    past(): Date {
      return faker.date.past()
    },
    soon(): Date {
      return faker.date.soon()
    }
  },
  number: {
    int({ min, max }: { min: number; max: number }): number {
      return faker.number.int({
        max,
        min
      })
    }
  }
}

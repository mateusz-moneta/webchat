import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];

    return getManager()
      .count(entity, { [args.property]: value })
      .then((count) => count < 1);
  }
}

export function UniqueOnDatabase(entity, validationOptions?: ValidationOptions) {
  validationOptions = { ...{ message: '$value already exists. Choose another.' }, ...validationOptions };

  return function (object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}

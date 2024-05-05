import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'timeString', async: true })
export class TimeStringValidator implements ValidatorConstraintInterface {
  async validate(text: string) {
    return /^(?:[01]\d|2[0-3])(?:[0-5]\d)$/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the format "00-24 00-59"`;
  }
}

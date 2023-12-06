import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

export function IsNotExistsRule(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prisma = new PrismaService();
          const res = await prisma[property].findFirst({
            where: {
              [args.property]: value,
            },
          });
          return !Boolean(res);
        },
      },
    });
  };
}

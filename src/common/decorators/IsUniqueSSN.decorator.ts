import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from "class-validator";
import { Patient } from "src/patient/patient.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueSSNConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(Patient)
        private _patientRepo: Repository<Patient>,
    ) {}

    async validate(ssn: string, args: ValidationArguments) {
        const patient = await this._patientRepo.findBy({ ssn: ssn });
        return patient ? false : true;
    }

    defaultMessage(args: ValidationArguments) {
        return "A patient with this SSN already exists";
    }
}

export function IsUniqueSSN(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueSSNConstraint,
        });
    };
}

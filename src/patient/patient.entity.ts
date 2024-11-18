import { IsString, Length, IsOptional, IsNotEmpty, IsDateString } from "class-validator";
import { IsUniqueSSN } from "@decorators";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from "typeorm";

@Entity()
@Unique(["ssn"])
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Length(1, 100)
    firstName: string;

    @Column()
    @IsString()
    @Length(1, 100)
    lastName: string;

    @Column()
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    @IsUniqueSSN({ message: "SSN must be unique" })
    ssn: string;

    @Column({ type: "date" })
    @IsDateString()
    dob: Date;

    @CreateDateColumn({ type: "datetime" })
    createdAt: Date;

    @UpdateDateColumn({ type: "datetime", nullable: true })
    updatedAt: Date;
}

export class CreatePatientDto {
    @IsString()
    @Length(1, 500)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @Length(1, 500)
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    @IsNotEmpty()
    ssn: string;

    @IsDateString()
    @IsNotEmpty()
    dob: Date;
}

export class UpdatePatientDto {
    @IsOptional()
    @IsString()
    @Length(1, 500)
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    lastName?: string;

    @IsOptional()
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    ssn?: string;

    @IsOptional()
    @IsDateString()
    dob?: Date;
}

export class QueryPatientDto {
    @IsOptional()
    @IsString()
    @Length(1, 500)
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    lastName?: string;

    @IsOptional()
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    ssn?: string;

    @IsOptional()
    @IsDateString()
    dob?: Date;
}

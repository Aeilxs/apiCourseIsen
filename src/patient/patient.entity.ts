import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Length, IsOptional, IsNotEmpty, IsDateString } from "class-validator";
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
    @ApiProperty({ description: "First name", maxLength: 500 })
    @IsString()
    @Length(1, 500)
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: "Last name", maxLength: 500 })
    @IsString()
    @Length(1, 500)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: "Social Security Number (ssn)",
        minLength: 15,
        maxLength: 15,
        example: "123456789123456",
    })
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    @IsNotEmpty()
    ssn: string;

    @ApiProperty({ description: "Date Of Birth (dob)", example: "1990-01-01" })
    @IsDateString()
    @IsNotEmpty()
    dob: Date;
}

export class UpdatePatientDto {
    @ApiProperty({ description: "First name", maxLength: 500 })
    @IsString()
    @IsOptional()
    @Length(1, 500)
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: "Last name", maxLength: 500 })
    @IsOptional()
    @IsString()
    @Length(1, 500)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: "Social Security Number (ssn)",
        minLength: 15,
        maxLength: 15,
        example: "123456789123456",
    })
    @IsOptional()
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    @IsNotEmpty()
    ssn: string;

    @ApiProperty({ description: "Date Of Birth (dob)", example: "1990-01-01" })
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    dob: Date;
}

export class QueryPatientDto {
    @ApiPropertyOptional({ description: "Filter by first name" })
    @IsOptional()
    @IsString()
    @Length(1, 500)
    firstName?: string;

    @ApiPropertyOptional({
        description: "Filter by last name",
    })
    @IsOptional()
    @IsString()
    @Length(1, 500)
    lastName?: string;

    @ApiPropertyOptional({ description: "Filter by ssn" })
    @IsOptional()
    @IsString()
    @Length(15, 15, { message: "SSN must be exactly 15 characters long" })
    ssn?: string;

    @ApiPropertyOptional({ description: "Filter by date (ISO 8601 YYYY-MM-DD)" })
    @IsOptional()
    @IsDateString()
    dob?: Date;
}

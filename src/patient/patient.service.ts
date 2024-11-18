import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Patient, CreatePatientDto, UpdatePatientDto, QueryPatientDto } from "./patient.entity";
import { Repository } from "typeorm";

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private _patientRepo: Repository<Patient>,
    ) {}

    async findById(id: number): Promise<Patient | null> {
        return await this._patientRepo.findOneBy({ id });
    }

    async findAll(): Promise<Patient[] | null> {
        return await this._patientRepo.find();
    }

    async findByQuery(dto: QueryPatientDto): Promise<Patient[] | null> {
        return await this._patientRepo.findBy(dto);
    }

    async create(dto: CreatePatientDto): Promise<CreatePatientDto & Patient> {
        return await this._patientRepo.save(dto);
    }

    async update(id: number, dto: UpdatePatientDto): Promise<Patient | null> {
        const patient = await this.findById(id);
        if (!patient) return null;

        Object.assign(patient, dto);
        patient.updatedAt = new Date();
        return await this._patientRepo.save(patient);
    }

    async remove(id: number): Promise<Patient | null> {
        const patient = await this.findById(id);
        if (patient) await this._patientRepo.delete({ id: patient.id });
        else return null;
        return patient;
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientDto, Patient, QueryPatientDto, UpdatePatientDto } from "./patient.entity";

@Controller("v1/patients")
export class PatientController {
    constructor(private readonly _patientService: PatientService) {}

    @Get()
    findAll(): Promise<Patient[]> | null {
        return this._patientService.findAll();
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number): Promise<Patient> | null {
        return this._patientService.findById(id);
    }

    @Get("/q")
    async findBy(@Query() query: QueryPatientDto) {
        console.log(query);
        return query; // Retourne les paramètres pour vérifier
    }

    @Post()
    create(@Body() dto: CreatePatientDto) {
        return this._patientService.create(dto);
    }

    @Put(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
        return this._patientService.update(id, dto);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this._patientService.remove(id);
    }
}

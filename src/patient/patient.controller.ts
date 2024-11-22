import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientDto, Patient, QueryPatientDto, UpdatePatientDto } from "./patient.entity";
import { ApiResponse } from "@nestjs/swagger";

@Controller("v1/patients")
export class PatientController {
    constructor(private readonly _patientService: PatientService) {}

    @Get()
    @ApiResponse({ status: 200, description: "Return empty array if DB empty" })
    findAll(): Promise<Patient[]> | null {
        return this._patientService.findAll();
    }

    @Get("id/:id")
    @ApiResponse({ status: 200, description: "Return null if no match" })
    findById(@Param("id", ParseIntPipe) id: number): Promise<Patient> | null {
        return this._patientService.findById(id);
    }

    @Get("/q")
    @ApiResponse({ status: 200, description: "Return empty array if no match" })
    async findBy(@Query() query: QueryPatientDto) {
        return this._patientService.findByQuery(query);
    }

    @Post()
    @ApiResponse({ status: 201, description: "Created with success." })
    @ApiResponse({ status: 400, description: "Bad request, bad json payload." })
    @ApiResponse({ status: 409, description: "Duplicate SSN" })
    create(@Body() dto: CreatePatientDto) {
        return this._patientService.create(dto);
    }

    @Patch(":id")
    @ApiResponse({ status: 201, description: "Updated with success." })
    @ApiResponse({ status: 400, description: "Bad request, bad json payload." })
    @ApiResponse({ status: 409, description: "Duplicate SSN" })
    update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
        return this._patientService.update(id, dto);
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Deleted with success, return patient if deleted, void if not found",
    })
    remove(@Param("id", ParseIntPipe) id: number) {
        return this._patientService.remove(id);
    }
}

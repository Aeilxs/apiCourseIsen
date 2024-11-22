import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { Patient } from "./patient.entity";
import { AuthGuard } from "nest-keycloak-connect";

@Module({
    imports: [TypeOrmModule.forFeature([Patient])],
    controllers: [PatientController],
    providers: [PatientService],
    exports: [PatientService],
})
export class PatientModule {}

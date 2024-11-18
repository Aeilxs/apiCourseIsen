import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientModule } from "./patient/patient.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
        PatientModule,
    ],
})
export class AppModule {}

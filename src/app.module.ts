import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientModule } from "./patient/patient.module";
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from "nest-keycloak-connect";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "./config/config.module";
import { KeycloakConfigService } from "./config/keycloak-config.service";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),

        KeycloakConnectModule.registerAsync({
            useExisting: KeycloakConfigService,
            imports: [ConfigModule],
        }),

        PatientModule,
        ConfigModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}

import { Injectable } from "@nestjs/common";
import {
    KeycloakConnectOptions,
    KeycloakConnectOptionsFactory,
    PolicyEnforcementMode,
    TokenValidation,
} from "nest-keycloak-connect";

/**
 * Pas fait de fichier env pour "faciliter" la correction, j'utilise donc des magics strings !
 */

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    createKeycloakConnectOptions(): KeycloakConnectOptions {
        return {
            authServerUrl: "http://localhost:8080",
            realm: "myrealm",
            clientId: "myclient",
            secret: "05c1ff5e-f9ba-4622-98e3-c4c9d280546e",
            cookieKey: "KEYCLOAK_JWT",
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: TokenValidation.ONLINE,
        };
    }
}

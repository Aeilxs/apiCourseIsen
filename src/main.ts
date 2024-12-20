import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { QueryExceptionFilter } from "@interceptors";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            validateCustomDecorators: true,
        }),
    );

    app.useGlobalFilters(new QueryExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle("Api Course ISEN")
        .setDescription("My super API woowoo")
        .setVersion("1.0")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(3000);
}

bootstrap();

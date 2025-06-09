import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/logger/winston.logger";
import { AllExceptionsFilter } from "./common/error/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    app.useGlobalFilters(new AllExceptionsFilter())
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    const config = new DocumentBuilder()
      .setTitle("BookStore project")
      .setDescription("BookStore API description")
      .setVersion("1.0.0")
      .addTag("BookStore")
      .addBearerAuth(
        {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
        }
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
} 
start();
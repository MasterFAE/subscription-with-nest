"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    process.on('uncaughtException', (err) => {
        console.error('UNCAUGHT EXCEPTION: ');
        console.error(err);
    });
    process.on('unhandledRejection', (err) => {
        console.error('UNHANDLED REJECTION: ');
        console.error(err);
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
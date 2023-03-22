import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/index.dto';
export declare class AuthController {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    logIn(req: any, res: any): Promise<any>;
    register(body: RegisterDTO, res: any): Promise<{
        access_token: string;
        refresh_token: string;
        email: string;
        id: number;
        firstName: string;
        lastName: string;
        createdAt: Date;
    }>;
}

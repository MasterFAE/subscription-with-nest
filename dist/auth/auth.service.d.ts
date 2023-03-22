import { RegisterDTO } from './dto/index.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private configService;
    private jwtService;
    constructor(prisma: PrismaService, configService: ConfigService, jwtService: JwtService);
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        email: string;
        password: string;
        id: number;
    }>;
    register(data: RegisterDTO): Promise<{
        access_token: string;
        refresh_token: string;
        email: string;
        id: number;
        firstName: string;
        lastName: string;
        createdAt: Date;
    }>;
    updateTokens(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    generateTokens(payload: {
        id: number;
        email: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}

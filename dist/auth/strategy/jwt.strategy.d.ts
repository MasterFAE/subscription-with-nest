import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    static extractJWTfromCookie(req: Request): any;
    validate(payload: any): {
        id: any;
        email: any;
    };
}
export {};

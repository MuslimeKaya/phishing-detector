import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateMaliciousAppDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    appName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    packageName: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    version?: string;

    @IsString()
    @IsOptional()
    @Length(1, 500)
    detectionReason?: string;
}
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateMaliciousAppDto {
    @IsString()
    @IsOptional()
    @Length(1, 255)
    packageName?: string;

    @IsString()
    @IsNotEmpty()
    @Length(64, 64)
    sha256: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    threatType: string;
}

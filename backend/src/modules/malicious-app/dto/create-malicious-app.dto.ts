import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateMaliciousAppDto {
    @ApiProperty({
        description: 'The SHA256 hash of the malicious application',
        example: 'd2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2',
    })
    @IsString()
    @IsNotEmpty()
    @Length(64, 64, { message: 'SHA256 must be 64 characters long' })
    sha256: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    packageName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    threatType: string;
}
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreatePhishingDto {
    @IsUrl()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsNotEmpty()
    source!: string;

    @IsString()
    @IsNotEmpty()
    target!: string;
}
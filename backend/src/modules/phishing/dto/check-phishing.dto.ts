import { IsString, IsUrl } from 'class-validator';

export class CheckPhishingDto {
  @IsString()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  url: string;
}

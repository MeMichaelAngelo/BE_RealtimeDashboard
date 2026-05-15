import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum ProjectStatus {
  FREE = 'free',
  ACTIVE = 'active',
  PAUSED = 'paused',
  DONE = 'done',
}

export class CreateProjectDto {
  @IsString()
  name!: string;

  // opcjonalne w requestcie → default w DB
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  // opcjonalne → default 0
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

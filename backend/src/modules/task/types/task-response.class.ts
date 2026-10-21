import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriorityEnum, StatusEnum } from '@prisma/client';

export class TaskResponseClass {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({ example: 'Купить молоко' })
  title: string;

  @ApiPropertyOptional({ example: '2 литра, обезжиренное' })
  description: string | null;

  @ApiProperty({ enum: StatusEnum, example: StatusEnum.PENDING })
  status: StatusEnum;

  @ApiProperty({ enum: PriorityEnum, example: PriorityEnum.HIGH })
  priority: PriorityEnum;

  @ApiPropertyOptional({
    format: 'date-time',
    example: '2026-11-01T18:00:00.000Z',
  })
  dueDate: Date | null;

  @ApiProperty({ format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt: Date;
}

export class PaginatedTaskResponseClass {
  @ApiProperty({ type: [TaskResponseClass] })
  items: TaskResponseClass[];

  @ApiProperty({ example: 45 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 3 })
  totalPages: number;
}

import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('tasks')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getSingleProject(@Param('id') projectID: string) {
    return this.service.getSingleProject(projectID);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.service.createProject(dto);
  }

  @Put(':id/task')
  updateTask(@Param('id') id: string, @Body() task: UpdateProjectDto) {
    return this.service.updateTask(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.removeProject(id);
  }
}

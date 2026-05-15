import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { ProjectsGateway } from './projects.gateway';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private gateway: ProjectsGateway,
  ) {}

  async findAll() {
    return this.projectModel.find().exec();
  }

  async getSingleProject(id: string): Promise<ProjectDocument> {
    const singleProject = await this.projectModel.findById(id).exec();

    if (!singleProject) {
      throw new NotFoundException('Project not found');
    }

    return singleProject;
  }

  async createProject(dto: CreateProjectDto): Promise<ProjectDocument> {
    const newProject = await this.projectModel.create(dto);
    this.gateway.emitCreated(newProject);

    return newProject;
  }

  async updateTask(
    id: string,
    dto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    this.gateway.emitUpdated(project);

    return project;
  }

  async removeProject(id: string): Promise<ProjectDocument> {
    const result = await this.projectModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('Project not found');
    }

    return result;
  }
}

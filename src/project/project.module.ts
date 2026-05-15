import { Module } from '@nestjs/common';

import { ProjectsService } from './projects.service';

import { ProjectsController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsGateway } from './projects.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name, //nazwa kolekcji z klasy schema
        schema: ProjectSchema,
        collection: 'DashboardCollection', //nazwa kolekcji z bazy Mongo
      },
    ]),
  ],
  providers: [ProjectsService, ProjectsGateway],
  controllers: [ProjectsController],
})
export class ProjectModule {}

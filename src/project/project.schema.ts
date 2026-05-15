import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'DashboardCollection' })
export class Project {
  @Prop({ required: true, minlength: 3, maxLength: 150 })
  name!: string;

  @Prop({ enum: ['Free', 'Active', 'Paused', 'Done'], default: 'Free' })
  status!: string;

  @Prop({ min: 0, max: 100, default: 0 })
  progress!: number;

  @Prop({ required: true, maxLength: 1000 })
  description!: string;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

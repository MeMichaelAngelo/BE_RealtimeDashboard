import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProjectsService } from './projects.service';

@WebSocketGateway({
  cors: { origin: '*' }, // Angular może się łączyć bez CORS problemów
})
export class ProjectsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}
  //private service: ProjectsService <- w constructor powwoduje błąd

  @SubscribeMessage('project:create')
  emitCreated(project: any) {
    this.server.emit('project.created', project);
  }

  emitUpdated(project: any) {
    this.server.emit('project.updated', project);
  }

  emitDeleted(projectId: string) {
    this.server.emit('project.deleted', projectId);
  }

  // DELETE
  // @SubscribeMessage('project:delete')
  // async delete(@MessageBody() id: string) {
  //   await this.service.removeProject(id);
  //   this.server.emit('project:deleted', id);
  //   console.log('gateway - delete() - id', id);
  //   return id;
  // }
}

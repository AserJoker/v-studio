import { IProject } from "@/types";
import { EventBus } from "@/util";

export class ProjectManager {
  private project?: IProject;
  private $bus: EventBus;

  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }

  public setProject(project: IProject) {
    this.project = project;
    this.$bus.emit(ProjectManager.EVENT_PROJECT_CHANGE, this.project);
  }

  public getProject() {
    return this.project;
  }

  public static EVENT_PROJECT_CHANGE = "project:change";
}

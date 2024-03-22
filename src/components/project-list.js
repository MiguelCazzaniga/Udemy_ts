var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "./base-components";
import { autobind } from "../decorators/autobind";
import { ProjectStatus } from "../models/project";
import { projectState } from "../state/state";
import { ProjectItem } from "./project-item";
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-project`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("dropable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("dropable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], ProjectList.prototype, "dragLeaveHandler", null);

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Este;
(function (Este) {
    var Component = (function () {
        function Component(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            var importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        Component.prototype.attach = function (insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        };
        return Component;
    }());
    Este.Component = Component;
})(Este || (Este = {}));
var Este;
(function (Este) {
    function autobind(target, methodName, descriptor) {
        var originalMethod = descriptor.value;
        var adjDescriptor = {
            configurable: true,
            get: function () {
                var boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    Este.autobind = autobind;
})(Este || (Este = {}));
var Este;
(function (Este) {
    var State = (function () {
        function State() {
            this.listeners = [];
        }
        State.prototype.addListener = function (listenerFn) {
            this.listeners.push(listenerFn);
        };
        return State;
    }());
    var ProjectState = (function (_super) {
        __extends(ProjectState, _super);
        function ProjectState() {
            var _this = _super.call(this) || this;
            _this.projects = [];
            return _this;
        }
        ProjectState.getInstance = function () {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        };
        ProjectState.prototype.addProject = function (title, description, numOfPeople) {
            var newProject = new Este.Project(Math.random().toString(), title, description, numOfPeople, Este.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        };
        ProjectState.prototype.moveProject = function (projectId, newStatus) {
            var project = this.projects.find(function (prj) { return prj.id === projectId; });
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        };
        ProjectState.prototype.updateListeners = function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listenerFn = _a[_i];
                listenerFn(this.projects.slice());
            }
        };
        return ProjectState;
    }(State));
    Este.ProjectState = ProjectState;
    Este.projectState = ProjectState.getInstance();
})(Este || (Este = {}));
var Este;
(function (Este) {
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = Este.ProjectStatus || (Este.ProjectStatus = {}));
    var Project = (function () {
        function Project(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
        return Project;
    }());
    Este.Project = Project;
})(Este || (Este = {}));
var Este;
(function (Este) {
    var ProjectList = (function (_super) {
        __extends(ProjectList, _super);
        function ProjectList(type) {
            var _this = _super.call(this, "project-list", "app", false, "".concat(type, "-project")) || this;
            _this.type = type;
            _this.assignedProjects = [];
            _this.configure();
            _this.renderContent();
            return _this;
        }
        ProjectList.prototype.dragOverHandler = function (event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                var listEl = this.element.querySelector("ul");
                listEl.classList.add("dropable");
            }
        };
        ProjectList.prototype.dropHandler = function (event) {
            var prjId = event.dataTransfer.getData("text/plain");
            Este.projectState.moveProject(prjId, this.type === "active" ? Este.ProjectStatus.Active : Este.ProjectStatus.Finished);
        };
        ProjectList.prototype.dragLeaveHandler = function (event) {
            var listEl = this.element.querySelector("ul");
            listEl.classList.remove("dropable");
        };
        ProjectList.prototype.configure = function () {
            var _this = this;
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            Este.projectState.addListener(function (projects) {
                var relevantProjects = projects.filter(function (prj) {
                    if (_this.type === "active") {
                        return prj.status === Este.ProjectStatus.Active;
                    }
                    return prj.status === Este.ProjectStatus.Finished;
                });
                _this.assignedProjects = relevantProjects;
                _this.renderProjects();
            });
        };
        ProjectList.prototype.renderContent = function () {
            var listId = "".concat(this.type, "-projects-list");
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        };
        ProjectList.prototype.renderProjects = function () {
            var listEl = document.getElementById("".concat(this.type, "-projects-list"));
            listEl.innerHTML = "";
            for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
                var prjItem = _a[_i];
                new Este.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        };
        __decorate([
            Este.autobind,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [DragEvent]),
            __metadata("design:returntype", void 0)
        ], ProjectList.prototype, "dragOverHandler", null);
        __decorate([
            Este.autobind,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [DragEvent]),
            __metadata("design:returntype", void 0)
        ], ProjectList.prototype, "dropHandler", null);
        __decorate([
            Este.autobind,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [DragEvent]),
            __metadata("design:returntype", void 0)
        ], ProjectList.prototype, "dragLeaveHandler", null);
        return ProjectList;
    }(Este.Component));
    Este.ProjectList = ProjectList;
})(Este || (Este = {}));
var Este;
(function (Este) {
    function validate(validatableInput) {
        var isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().length !== 0;
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    Este.validate = validate;
})(Este || (Este = {}));
var Este;
(function (Este) {
    var ProjectInput = (function (_super) {
        __extends(ProjectInput, _super);
        function ProjectInput() {
            var _this = _super.call(this, "project-input", "app", true, "user-input") || this;
            _this.titleInputElement = _this.element.querySelector("#title");
            _this.descriptionInputElement = _this.element.querySelector("#description");
            _this.peopleInputElement = _this.element.querySelector("#people");
            _this.configure();
            return _this;
        }
        ProjectInput.prototype.configure = function () {
            this.element.addEventListener("submit", this.submitHandler);
        };
        ProjectInput.prototype.renderContent = function () { };
        ProjectInput.prototype.gatherUserInput = function () {
            var enteredTitle = this.titleInputElement.value;
            var enteredDescription = this.descriptionInputElement.value;
            var enteredPeople = this.peopleInputElement.value;
            var titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            var descriptionValidatable = {
                value: enteredDescription,
                required: true,
                maxLength: 25,
            };
            var peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
            if (!Este.validate(titleValidatable) ||
                !Este.validate(descriptionValidatable) ||
                !Este.validate(peopleValidatable)) {
                alert("invalid Input. Please try again");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        };
        ProjectInput.prototype.clearInputs = function () {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        };
        ProjectInput.prototype.submitHandler = function (event) {
            event.preventDefault();
            var userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                var title = userInput[0], desc = userInput[1], people = userInput[2];
                Este.projectState.addProject(title, desc, people);
            }
            this.clearInputs();
        };
        __decorate([
            Este.autobind,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Event]),
            __metadata("design:returntype", void 0)
        ], ProjectInput.prototype, "submitHandler", null);
        return ProjectInput;
    }(Este.Component));
    Este.ProjectInput = ProjectInput;
})(Este || (Este = {}));
var Este;
(function (Este) {
    var prjInput = new Este.ProjectInput();
    var activePrjlist = new Este.ProjectList("active");
    var finishedPrjlist = new Este.ProjectList("finished");
})(Este || (Este = {}));
var Este;
(function (Este) {
    var ProjectItem = (function (_super) {
        __extends(ProjectItem, _super);
        function ProjectItem(hostId, project) {
            var _this = _super.call(this, "single-project", hostId, false, project.id) || this;
            _this.project = project;
            _this.configure();
            _this.renderContent();
            return _this;
        }
        Object.defineProperty(ProjectItem.prototype, "persons", {
            get: function () {
                if (this.project.people === 1) {
                    return "1 person";
                }
                else {
                    return "".concat(this.project.people, " persons");
                }
            },
            enumerable: false,
            configurable: true
        });
        ProjectItem.prototype.dragStartHandler = function (event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        };
        ProjectItem.prototype.dragEndHandler = function (_) {
            console.log("dragEnd");
        };
        ProjectItem.prototype.configure = function () {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        };
        ProjectItem.prototype.renderContent = function () {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + "assigned";
            this.element.querySelector("p").textContent = this.project.description;
        };
        __decorate([
            Este.autobind,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [DragEvent]),
            __metadata("design:returntype", void 0)
        ], ProjectItem.prototype, "dragStartHandler", null);
        return ProjectItem;
    }(Este.Component));
    Este.ProjectItem = ProjectItem;
})(Este || (Este = {}));

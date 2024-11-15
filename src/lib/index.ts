import TYPES from "./config/types";
import "./config/provide";
import { inject, init } from "./core/di";
import type LoggerService from "./services/base/LoggerService";
import type { TAppwriteService } from "./services/base/AppwriteService";
import type TodoViewService from "./services/view/TodoViewService";
import type TodoDbService from "./services/db/TodoDbService";
import type TodoRequestService from "./services/helper/TodoRequestService";
import type ErrorService from "./services/base/ErrorService";

const baseServices = {
    loggerService: inject<LoggerService>(TYPES.loggerService),
    appwriteService: inject<TAppwriteService>(TYPES.appwriteService),
    errorService: inject<ErrorService>(TYPES.errorService),
};

const viewServices = {
    todoViewService: inject<TodoViewService>(TYPES.todoViewService),
};

const dbServices = {
    todoDbService: inject<TodoDbService>(TYPES.todoDbService),
};

const requestServices = {
    todoRequestService: inject<TodoRequestService>(TYPES.todoRequestService),
};

init();

export const ioc = {
    ...baseServices,
    ...viewServices,
    ...dbServices,
    ...requestServices,
};

export { AppwriteService } from './services/base/AppwriteService';

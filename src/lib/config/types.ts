const baseServices = {
    loggerService: Symbol('loggerService'),
    appwriteService: Symbol('appwriteService'),
    errorService: Symbol.for('errorService'),
};

const viewServices = {
    todoViewService: Symbol('todoViewService'),
};

const dbServices = {
    todoDbService: Symbol('todoDbService'),
};

const requestServices = {
    todoRequestService: Symbol('todoRequestService'),
};

export const TYPES = {
    ...baseServices,
    ...viewServices,
    ...dbServices,
    ...requestServices,
};

export default TYPES;

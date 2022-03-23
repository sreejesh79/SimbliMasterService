/* eslint-disable */ 

export interface RouteDefinition {
	path: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'use' | 'all';
    methodName: string;
}

export const BASE_PATH: string = '/api/v1';
export const Middlewares = (): void => {
    require("../api/middlewares/api.middleware");

}

export const Controllers = () => {
    require('../api/controllers/main.controller');
    require('../api/controllers/org.controller');
}
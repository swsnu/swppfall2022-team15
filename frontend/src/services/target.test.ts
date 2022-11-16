import axios from "axios";
import {createTarget, deleteTarget} from "./target";


describe('targets', () => {
    it('should create target - success', () => {
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({data: {id: 1}}));
        createTarget('title', 'type', 'endpoint');
    });

    it('should create target - fail', () => {
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject({response: {data: {id: 1}}}));
        createTarget('title', 'type', 'endpoint');
    });

    it('should delete target -success', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve({data: {id: 1}}));
        deleteTarget(1);
    });

    it('should delete target - failure', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject({response: {data: {id: 1}}}));
        deleteTarget(1);
    });
});
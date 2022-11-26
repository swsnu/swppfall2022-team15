import {createMessage, deleteMessage} from "./message";
import axios from "axios";

describe('message', () => {
    it('should create message - success', () => {
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({data: {id: 1}}));
        createMessage('title', 'content');
    });

    it('should create message - fail', () => {
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject({response: {data: {id: 1}}}));
        createMessage('title', 'content');
    });

    it('should delete message -success', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve({data: {id: 1}}));
        deleteMessage(1);
    });

    it('should delete message - failure', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject({response: {data: {id: 1}}}));
        deleteMessage(1)
    });
});

import axios from "axios";
import {deleteTarget} from "./target";


describe('targets', () => {


    it('should delete target -success', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve({data: {id: 1}}));
        deleteTarget(1);
    });

    it('should delete target - failure', () => {
        jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject({response: {data: {id: 1}}}));
        deleteTarget(1);
    });
});
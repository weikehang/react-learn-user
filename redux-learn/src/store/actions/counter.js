import * as types from '../../types/action-types';
import {push} from '../../connected-react-router';
export default {
    add(){
        return {type:types.ADD1};
    },
    goto(path,state){
        return push(path,state);
    }
}
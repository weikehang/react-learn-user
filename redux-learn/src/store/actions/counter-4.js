import {push} from "../../connected-react-router"
import * as types from "../../types/action-types"
export default {
    add(){
        return {type: types.ADD}
    },
    go(path) {
        /*
        *  type:types.CALL_HISTORY_METHOD,
            payload:{
                method:"push",
                args
            }
        * */
        return push(path);
    }
};
//这是store的文件处理 根据reducers创建了一个store
import {createStore,applyMiddleware} from "../redux";
import promise from "../store/redux-promise";
import thunk from "../store/redux-thunk";
import logger from "../store/redux-logger";
import reducer from "./reducer";


let store = applyMiddleware(promise,thunk,logger)(createStore)(reducer);


export {store};

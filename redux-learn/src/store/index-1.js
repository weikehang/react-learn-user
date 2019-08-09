//这是store的文件处理 根据reducers创建了一个store
import {createStore,applyMiddleware} from "../redux";
import {persistStore,persistReducer} from "../react-redux/redux-persist";
import storage from '../react-redux/redux-persist/lib/storage'
import reducer from "./reducer";
import thunk from "../store/redux-thunk";
import logger from "../store/redux-logger";
import promise from "../store/redux-promise";

//配置
const persistConfig = {
    key: "root",
    storage,
    whitelist:["counter2"]
};


const persistedReducer = persistReducer(persistConfig, reducer);
let store = applyMiddleware(promise,thunk,logger)(createStore)(persistedReducer);

const persistor = persistStore(store);

export {store,persistor};

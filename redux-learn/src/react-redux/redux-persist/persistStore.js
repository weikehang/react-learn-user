//这个方法主要负责派发保存和取值得两个动作
export default function (store) {
    let persistor = {
        ...store,
        initialize(){
          store.dispatch({type:"PERSIST_INIT"})
        },
        save() {
            store.dispatch({type:"PERSIST_SAVE"})
        }

    };
    return persistor;
}
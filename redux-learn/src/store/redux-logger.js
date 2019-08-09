export default function ({getState, dispatch}) {
    return function (next) {
        return function (action) {
            console.log(`老的状态${JSON.stringify(getState())}`);
            next(action);
            console.log(`新的状态${JSON.stringify(getState())}`);
        };
    };
}
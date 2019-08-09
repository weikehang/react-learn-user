export default function (...funcs) {
    if (funcs.length === 0) {
        return args => args;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b)=>{
         return function (...arg) {
             return a(b(...arg))
         }
    });
}
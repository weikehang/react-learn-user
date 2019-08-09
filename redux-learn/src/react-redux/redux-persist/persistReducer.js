/*
* 1.当派发动作得时候，要负责把新的状态持久化到存贮空间去
* 2.可以从存贮空间中加载初始化的数据发给仓库
* 它就是对reducer的增强
* */
export default function (persistConfig,reducer) {
    //定义是否已经初始化了
    let initilzed = false;
   //获取到配置环境转入的key 这个一般是保存本地数据的名称
    let key = `persist:${persistConfig.key}`;
    //获取黑名单和白名单
    let whitelist = persistConfig.whitelist;
    let blacklist = persistConfig.blacklist;
    console.log(whitelist)

    //需要返回一个reducer格式的函数
    return function (state, action) {
      if(action.type === "PERSIST_INIT"){
          initilzed = true;
          //初始化取奔本地的值
          let value = persistConfig.storage.getItem(key);
          state = value ? JSON.parse(value) : undefined;
          //执行reducer返回用到的state
          return reducer(state, action);
      }

      if (action.type === "PERSIST_SAVE") {
          if (initilzed) {
              let saveState = {};
              if (whitelist) {
                  //遍历state，拿到每个state

                  for (let key in state) {
                      //在白名单中的保存
                      if (whitelist.indexOf(key) != -1) {
                          saveState[key] = state[key];
                      }
                  }
              }else if (blacklist) {
                  for (let key in state) {
                      if (blacklist.indexOf(key) != -1) {
                          saveState[key] = state[key];
                      }
                  }
              }

              //然后将结果保存到本地
              persistConfig.storage.setItem(key,JSON.stringify(saveState));
              return state;
          }
       }
      //默认进来这个
        return reducer(state, action);
    };
}
import React from "react";
import {Route} from "../react-router-dom";
//这个组件就是受保护的路由
//withRoute就是一个高阶组件 接收传入的组件 然后通过route进行渲染 会把history的各种方法属性传递过去
export default function WithRoute(Component) {
    return props=><Route component={Component}/>
}
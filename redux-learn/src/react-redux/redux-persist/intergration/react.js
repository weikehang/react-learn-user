import React from "react";
//这是一个组件 组件是处理默认是初始化事件 和卸载前的数据保存
class PersistGate extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //触发初始化事件 主要是获取 看看本地有没有存过的数据，有的话就拿出来放到reducer中
        //返回新的state
        this.props.persistor.initialize();
    }

    componentWillUnmount() {
        //组件将要卸载的时候，就要将数据保存起来
        console.log("PersistGate componentWillUnmount")
        this.props.persistor.save();
    }

    render() {
        //渲染子组件
        return this.props.children;
    }
};

export {PersistGate};
import React from 'react';

class PureComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let oldProps = this.props;

        //判断如果是null或者不是对象 直接更新
        if (oldProps === null || typeof oldProps !== "object" || nextProps === null || typeof nextProps !== "object") {
            return true;
        }

        //判断两个对象的key长度是不是相等，不相等直接更新
        if (Object.keys(oldProps).length !== Object.keys(nextProps).length) {
            return true;
        }

        //判断新的属性 与旧的属性是不是相同的，如果不同，直接更新
        for (let oldKey in oldProps) {
            if (!nextProps.hasOwnProperty(oldKey) || nextProps[oldKey] !== oldProps[oldKey]) {
                return true;
            }
        }
        return false;
    }
}

export default PureComponent;
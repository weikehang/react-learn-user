import React from 'react';
//这个文件主要是想练习上下文对象创建的过程
let ThemeContext = createContext();
function createContext(){
    class Provider extends React.Component{
        static value;
        constructor(props){
            super(props);
            Provider.value = props.value;
            this.state = {number:0};
        }
        //每当此组件接收到新的属性的时候，都会执行这个方法，这个方法会返回新的状态对象
        static getDerivedStateFromProps(nextProps,prevState) {
            Provider.value = nextProps.value;
            return prevState;
        }
        render(){
            return this.props.children;
        }
    }
    class Consumer extends React.Component{
        render(){
            return this.props.children(Provider.value);
        }
    }
    return {Provider,Consumer}
}
//ThemeContext {Provider,Consumer}
class Header extends React.Component{
    //定义接收上下文对象
    static contextType = ThemeContext;
    constructor(props){//pros属性对象 context 上下文对象
        super(props);

    }
    render(){
        //context2是自定义的 因为react内部不允许这个属性赋值
        //这里就可以拿到了上下文对象
        this.context2 = Content.contextType.Provider.value;
        return (
            <div style={{border:`5px solid ${this.context2.color}`,padding:5}}>
                Header
                <Title/>
            </div>
        )
    }
}

function Title(){
    return (
        //这里Consumer下面的组件是一个函数 所以内部拿到函数然后执行它，转入Provider.value的值，所以这里就接收到value
        <ThemeContext.Consumer>
            {
                value=>(
                    <div style={{border:`5px solid ${value.color}`,padding:5}}>
                        Title
                    </div>
                )
            }
        </ThemeContext.Consumer>
    )
}
class Main extends React.Component{
    static contextType = ThemeContext;
    constructor(props){//pros属性对象 context 上下文对象
        super(props);
    }
    render(){
        //context2是自定义的 因为react内部不允许这个属性赋值
        //这里就可以拿到了上下文对象
        this.context2 = Content.contextType.Provider.value;
        return (
            <div style={{border:`5px solid ${this.context2.color}`,padding:5}}>
                Main
                <Content/>
            </div>
        )
    }
}
class Content extends React.Component{
    static contextType = ThemeContext;
    constructor(props){//pros属性对象 context 上下文对象
        super(props);
    }
    render(){
        //context2是自定义的 因为react内部不允许这个属性赋值
        //这里就可以拿到了上下文对象
        this.context2 = Content.contextType.Provider.value;
        return (
            <div style={{border: `5px solid ${this.context2.color}`, padding: 5}}>
                Content
                <button onClick={()=>this.context2.changeColor("red")}>变红</button>
                <button onClick={()=>this.context2.changeColor("green")}>变绿</button>
            </div>
        );
    }
}
class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {color:'green'};
    }

    //这个函数负责修改颜色 但是函数的调用是在下层组件的 修改后的颜色会重新渲染通过context转入新的属性
    changeColor = (color)=>{
        this.setState({color});
    };
    render(){
        let value = {color:this.state.color,changeColor:this.changeColor};
        console.log('Page.render',value)
        return (
            //通过上下文给Provider转入属性
            <ThemeContext.Provider value={value}>
                <div style={{border:`5px solid ${this.state.color}`,padding:5}}>
                    Page
                    <Header/>
                    <Main/>
                </div>
            </ThemeContext.Provider>
        )
    }
}
export default Page;
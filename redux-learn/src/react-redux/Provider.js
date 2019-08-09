import  React from "react";
//Provider主要树通过上下文传递数据
import ReactReduxContext from "./context";
export default class Provider extends React.Component{
      render() {
        //store主要是通过props传递进来的
         return(
             <ReactReduxContext.Provider value={{store:this.props.store}}>
                 {this.props.children}
             </ReactReduxContext.Provider>
         )
      }
}

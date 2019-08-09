import React from "react";
import ReactReduxContext from "./context";

export default function WithPrompt(Component) {
   return class extends React.Component {
      static contextType = ReactReduxContext;
      settle = (when,message)=> {
         let history = this.context.history;
         if (when) {
            history.block(message);
         }else {
            history.back(null);
         }
       };

      componentWillUnmount() {
         this.context.history.unblock();
      }

      render() {
         return <Component {...this.props} settle={this.settle}/>
      }
   };
};
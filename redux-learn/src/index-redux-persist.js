import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from './react-redux';
import {store,persistor} from './store';
import Counter1 from './componnets/Counter1';
import Counter2 from './componnets/Counter2';
import Counter3 from './componnets/Counter3';
import Form from './componnets/Form';
import Page from './componnets/Page';
import {PersistGate} from './react-redux/redux-persist/intergration/react';

class Main extends React.Component {
    state = {show: true};
    render() {
        return (
            <div>
                <button onClick={()=>this.setState({show: false})}>kill</button>
                {
                    this.state.show&&(
                        <PersistGate loading={null} persistor={persistor}>
                            {/*<Counter1/>*/}
                            <Counter2/>
                            {/*<Counter3/>*/}
                        </PersistGate>
                    )
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>, document.getElementById('root'));

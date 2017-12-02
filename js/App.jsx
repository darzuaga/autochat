import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Dashboard from './Dashboard'
import Landing from './Landing'
import FacebookLogin from './FacebookLogin'
import Pages from './Pages'

const App = () => {
    return(
        <BrowserRouter>
            <Provider store={store}>
                <div className="app uk-height-1-1">
                    <Switch>
                        <Route exact path='/' component={FacebookLogin} />
                        <Route path='/automations' component={Landing} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/login' component={FacebookLogin} />
                        <Route path='/pages' component={Pages} />
                    </Switch>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App;

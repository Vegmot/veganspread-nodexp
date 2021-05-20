import { Route, Switch } from 'react-router-dom'

import NotFound from './components/layout/NotFound'
import ModalManager from './components/modals/ModalManager'
import Navbar from './components/layout/navbar/Navbar'
import FeedsScreen from './screens/feeds/FeedsScreen'
import EachFeedScreen from './screens/feeds/EachFeedScreen'
import CommentsScreen from './screens/feeds/comments/CommentsScreen'
import UserDetailsScreen from './screens/users/UserDetailScreen'

const App = () => {
  return (
    <>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route exact path='/user/:id' component={UserDetailsScreen} />
        <Route exact path='feed/:id/comments' component={CommentsScreen} />
        <Route exact path='/feed/:id' component={EachFeedScreen} />
        <Route exact path='/' component={FeedsScreen} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App

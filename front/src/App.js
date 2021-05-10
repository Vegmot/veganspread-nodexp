import { Route, Switch } from 'react-router-dom'

import NotFound from './components/layout/NotFound'
import ModalManager from './components/modals/ModalManager'
import Navbar from './components/layout/navbar/Navbar'
import AboutScreen from './screens/about/AboutScreen'
import ContactScreen from './screens/contact/ContactScreen'
import FeedsScreen from './screens/feeds/FeedsScreen'
import EachFeedScreen from './screens/feeds/EachFeedScreen'
import NewsScreen from './screens/news/NewsScreen'
import UserDetailsScreen from './screens/users/UserDetailScreen'
import PostForm from './screens/feeds/posts/PostForm'

const App = () => {
  return (
    <>
      <ModalManager />
      <Navbar />
      <Switch>
        <Route exact path='/user/:id' component={UserDetailsScreen} />
        <Route exact path='/news' component={NewsScreen} />
        <Route exact path='/about' component={AboutScreen} />
        <Route exact path='/contact' component={ContactScreen} />
        <Route exact path='/feed/:id' component={EachFeedScreen} />
        <Route exact path='/create' component={PostForm} />
        <Route exact path='/' component={FeedsScreen} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App

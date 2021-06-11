
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import Productscreen from './screens/Productscreen'
import Cartscreen from './screens/CartScreen'
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RigesterScreen from './screens/RigesterScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import orderScreen from './screens/Orderscreen';
import UsersList from './screens/userListScreens';
import userEditScreen from './screens/userEditScreen';
import productlistScreen from './screens/productlistScreen';
import productEditlistScreen from './screens/productlistEditScreen'
import OrderListScreen from './screens/orderlist'


const App = () => {
  return (
    <Router>
      <Header />

      <Container>

        <main className="py-3">

          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/placeorder' component={PlaceorderScreen} exact />
          <Route path='/order/:id' component={orderScreen} exact />
          <Route path='/register' component={RigesterScreen} exact />
          <Route path='/Product/:id' component={Productscreen} />
          <Route path='/cart/:id?' component={Cartscreen} />
          <Route path='/admin/userlist' component={UsersList} />
          <Route path='/admin/users/:id/edit' component={userEditScreen} />
          <Route path='/admin/productlist' component={productlistScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={productlistScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/products/:id/edit' component={productEditlistScreen} />


        </main>

      </Container>

      <Footer />

    </Router>


  );
}

export default App;

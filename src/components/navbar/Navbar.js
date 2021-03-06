import {React, Component} from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import {IoIosCreate} from 'react-icons/io';
import {DiLinux} from 'react-icons/di';
import {AiFillInfoCircle} from 'react-icons/ai'

import logo from '../../assets/logo-lino.png'
import AddBlog from '../blogs/AddBlog';
import Home from '../home/Home';
import ViewBlog from '../blogs/ViewBlog';
import LinuxTutorial from '../tutorial/LinuxTutorial'


class Navbar extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
                                <div className="navbar-nav mr-auto navbar-brand">
                                    <div className="d-flex align-item-center">
                                        <div>
                                            <img src={logo} alt="logo" className="res-image"/>
                                        </div>
                                        <div>
                                            <Link to="/" className="link-no-style">
                                                <div className="link-color res-header">Linovert</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="float-right">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuCollapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div className="collapse navbar-collapse" id="menuCollapse">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to="/create-blog" className="link-no-style nav-link">
                                                <div className="link-color res-link">
                                                    <i><IoIosCreate className="align-middle mr-1"/></i>
                                                    <span className="align-middle">Create Blog</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/linux-tutorials" className="link-no-style nav-link">
                                                <div className="link-color res-link">
                                                    <i><DiLinux className="align-middle mr-1"/></i>
                                                    <span className="align-middle">Linux Tutorial</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/about" className="link-no-style nav-link">
                                                <div className="link-color res-link">
                                                    <i><AiFillInfoCircle className="align-middle mr-1"/></i>
                                                    <span className="align-middle">about</span>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/create-blog" component={AddBlog} />
                                <Route exact path="/view-post/:title" render={(props) => <ViewBlog {...props}/>} />
                                <Route exact path="/linux-tutorials/:title" render={(props) => <ViewBlog {...props}/>} />
                                <Route exact path="/linux-tutorials" component={LinuxTutorial} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Navbar;
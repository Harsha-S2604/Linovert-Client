import axios from 'axios';
import React, {Component} from 'react'
import {FaInstagram} from 'react-icons/fa'
import { Redirect, Link } from 'react-router-dom';
 
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            recentArticles: [],
            responseErrorMessage: "",
            isViewBlog: false,
            valueToSend: {},
        }
    }

    componentDidMount() {
        this.getRecentPost()
    }

    viewBlog = (event, index) => {
        event.preventDefault();
        const sliceArr = this.state.recentArticles.slice()
        const val = sliceArr[index]
        this.setState({
            isViewBlog: true,
            valueToSend: val
        })
    }

    getRecentPost = () => {
        axios.get("http://localhost:8080/get-recent-post")
            .then((response) => {
                this.setState({
                    isLoaded: true,
                    recentArticles: response.data,
                });
            })
            .catch((error) => {
                this.setState({
                    responseErrorMessage: error,
                    isLoaded: true
                })
            })
    }


    render() {
        if(this.state.isViewBlog) {
            var val = this.state.valueToSend
            var titleChange = val.Title.replaceAll(' ', '-')
            titleChange = titleChange.replaceAll("/", "-")
            return (
                <div>
                    <Redirect to={{
                        pathname: "/view-post/"+titleChange, 
                        state:{post: this.state.valueToSend}
                        }} />
                </div>
            )
        } else if(!(this.state.isLoaded)) {
            return (
                <div className="spinner"></div>
            )
        }
        return (
            <div className="home-padding">
                <div className="row">
                    <div className="col-8">
                        <h3 className="site-color"><b>Recent Articles</b></h3>
                        <hr/>
                        { (this.state.recentArticles.length > 0) ?
                            this.state.recentArticles.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <div className="card shadow rounded">
                                            {/* <img className="card-img-top img-fluid" src={image.default} alt={value.Title}/> */}
                                            <div className="card-body">
                                                <h3 className="card-title site-color"><b>{value.Title}</b></h3>
                                                <p className="card-text"><b>{value.Description}</b></p><br/>
                                                <button className="btn btn-dark float-right" 
                                                onClick={(event) => this.viewBlog(event,index)}>View Post</button>
                                            </div>
                                        </div><br/>
                                    </div>
                                )
                            }) : 
                            <div>
                                <h3 className="text-danger"><b>Sorry! No recent articles</b></h3>
                            </div>
                        }
                    </div>
                    <div className="col">
                        <h3 className="site-color"><b>Tutorials</b></h3>
                        <hr/>
                        <div className="card shadow rounded">
                            <div className="card-body">
                                <h3 className="card-title site-color"><b>Linux Tutorial</b></h3>
                                <p className="card-text"><b>This tutorial will give you a solid understanding of linux</b></p>
                                <button className="btn btn-dark float-right">
                                    <Link to="/linux-tutorials"> <div className="button-link-color">Click Here</div></Link>
                                </button>
                            </div>
                        </div><br/><br/>
                        <div className="row">
                            <div className="col">
                                <h3 className="site-color"><b>Follow Me</b></h3>
                                <hr/>
                                <div className="card shadow rounded">
                                    <div className="card-body">
                                    <FaInstagram /><button className="card-text no-link">Instagram</button>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
import axios from 'axios';
import React, {Component} from 'react'
import {FaInstagram} from 'react-icons/fa'
 
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            recentArticles: [],
            responseErrorMessage: "",
        }
    }

    componentDidMount() {
        this.getRecentPost()
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
        return (
            <div className="home-padding">
                <div className="row">
                    <div className="col-8">
                        <h3 className="site-color"><b>Recent Articles</b></h3>
                        <hr/>
                        {
                            this.state.recentArticles.map((value, index) => {
                                const image = require('../../assets/'+value.Id+'.jpg')
                                return (
                                    <div key={index}>
                                        <div className="card shadow rounded">
                                            {/* <img className="card-img-top img-fluid" src={image.default} alt={value.Title}/> */}
                                            <div className="card-body">
                                                <h3 className="card-title site-color"><b>{value.Title}</b></h3>
                                                <p className="card-text"><b>{value.Description}</b></p><br/>
                                                <button className="btn btn-dark float-right">Full Post</button>
                                            </div>
                                        </div><br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col">
                        <h3 className="site-color"><b>Tutorials</b></h3>
                        <hr/>
                        <div className="card shadow rounded">
                            <div className="card-body">
                                <h3 className="card-title site-color"><b>Linux Tutorial</b></h3>
                                <p className="card-text"><b>This tutorial will give you a solid understanding of linux</b></p>
                                <button className="btn btn-dark float-right">Click Here</button>
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
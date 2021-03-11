import axios from 'axios';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class LinuxTutorial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMessage: "",
            isViewBlog: false,
            valueToSend: {},
        }
    }


    componentDidMount() {
        this.getAllPosts()
    }

    viewBlog = (event, index) => {
        event.preventDefault();
        const sliceArr = this.state.posts.slice()
        const val = sliceArr[index]
        this.setState({
            isViewBlog: true,
            valueToSend: val
        })
    }

    getAllPosts = () => {
        axios.get("http://localhost:8080/get-all-post")
        .then((response) => {
            this.setState({
                posts: response.data,
                errorMessage: ""
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.data,
                posts: []
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
                    {this.props.history.push("/linux-tutorials")}
                    <Redirect to={{
                        pathname: "/linux-tutorials/"+titleChange, 
                        state:{post: this.state.valueToSend}
                        }} />
                </div>
            )
        }
        return (
            <div className="tutorial-padding">
                <div className="card shadow rounded">
                <div className="card-body">
                <h1 className="site-color"><b>Linux Tutorial Series</b></h1><hr/><br/>
                {this.state.posts.length !== 0 ?
                    <div>
                        <ol>
                        {this.state.posts.map((value, index) => {
                            return (
                                <div key={index}>
                                    <button className="no-link-tuts"
                                    onClick={(event) => this.viewBlog(event,index)}><h5><b><li>{value.Title}</li></b></h5></button><br/><br/>
                                </div>
                            )
                        })}
                        </ol>
                    </div>
                : null}
                <h4 className="text-center text-info">=========More On the way==========</h4>
                </div>
                </div>     
            </div>
        )
    }
}

export default LinuxTutorial;
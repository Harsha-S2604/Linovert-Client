import {React, Component} from 'react';
import {MdEdit, MdAdd} from 'react-icons/md';
import Prism from 'prismjs';

import 'react-quill/dist/quill.snow.css'
import 'prismjs/themes/prism.css';


class AddBlog extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            error: {
                titleError: ""
            },
            isFocusOut: false,
            contents: [],
            codes: [],
        }
    }

    componentDidMount() {
        Prism.highlightAll();
    }

    handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name
        const value = event.target.value
        switch(name) {
            case "title":
                if(value === "") {
                    var error = {...this.state.error}
                    error.titleError = "*Field Required"
                    this.setState({
                        error,
                        title: value,
                    })
                } else if(value.length < 5) {
                    error = {...this.state.error}
                    error.titleError = "*should be minimum of 5 characters"
                    this.setState({
                        error,
                        title: value,
                    })
                } else {
                    error = {...this.state.error}
                    error.titleError = ""
                    this.setState({
                        error,
                        title: value,
                    })
                }

                break;

            default:
                break;
        }
    }

    handleContentChange = (event, index) => {
        const val = event.target.value;
        const slicArr = this.state.contents.slice();
        slicArr[index] = val;
        this.setState({
            contents: slicArr,
        })
    }

    handleCodeChange = (event, index) => {
        const val = event.target.value;
        const slicArr = this.state.codes.slice();
        slicArr[index] = val;
        this.setState({
            codes: slicArr
        })
    }

    handleFocusOut = (event) => {
        event.preventDefault();
        this.setState({
            isFocusOut: true
        })
    }

    handleChangeTitle = (event) => {
        event.preventDefault();
        this.setState({
            isFocusOut: false
        })
    }

    handleAddContent = (event) => {
        event.preventDefault();
        const slicArr = this.state.contents.slice();
        const slicCode = this.state.codes.slice();
        slicCode.push("");
        slicArr.push("");
        this.setState({
            contents: slicArr,
            codes: slicCode,
        })
    }

    handleAddCode = (event) => {
        event.preventDefault();
        
    }

    handleAddImage = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="blog-padding">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h2 className="site-color"><b>Create Blog</b></h2><br/>
                        </div>
                        <div className="col">
                            <button type="button" className="shadow btn btn-dark" onClick={this.handleAddContent}>
                                <MdAdd className="mr-1"/>Add Content
                            </button>
                        </div>
                    </div>
                    <form>
                        {(!this.state.isFocusOut || this.state.title === "") ?
                        <div className="form-group">
                            <label for="title"><h5><b>Title</b></h5></label>
                            <input type="text" className="form-control"
                                    placeholder="Enter title" required
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusOut}/>
                            {(this.state.error.titleError) ? 
                            <div className="pt-1">
                                <b className="text-danger">{this.state.error.titleError}</b>
                            </div> : null}
                        </div> : 
                        <div>
                            <div className="row">
                                <div className="col">
                                    <h5><b>Title</b></h5>
                                </div>
                                <div className="col float-left">
                                    <button className="no-link" onClick={this.handleChangeTitle}>
                                        <h5 className="edit-color"><MdEdit className="pr-1"/>Edit</h5>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <h2 className="site-color"><b>{this.state.title}</b></h2><br/>
                        </div>}
                        {this.state.contents.length > 0 ? 
                        <div>
                            {this.state.contents.map((values, i) => {
                                return (
                                    <div className="form-group" key={i}>
                                        <label for="content"><h5><b>Content</b></h5></label>
                                        <textarea  id="content" className="form-control"
                                        name="content"
                                        value={values}
                                        onChange={(event) => this.handleContentChange(event, i)} 
                                        required></textarea><br/>
                                        <label for="content"><h5><b>Code</b></h5></label>
                                        <textarea theme="snow" id="content" className="form-control"
                                        name="code"
                                        value={this.state.codes[i]}
                                        onChange={(event) => this.handleCodeChange(event, i)} 
                                        required></textarea>
                                    </div>
                                );
                            })}
                        </div>:null}
                        {this.state.contents.length > 0 ? 
                        <div>
                            <button className="btn btn-dark">Submit</button>
                        </div>:null}
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBlog;
import {React, Component} from 'react';
import {MdEdit, MdAdd} from 'react-icons/md';
import Prism from 'prismjs';
import axios from 'axios';
import Post from '../model/post'
import { Editor } from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import convert from 'htmr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'prismjs/themes/prism.css';
import "prismjs/components/prism-jsx.min.js";


class AddBlog extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            error: {
                titleError: "",
                descriptionError: "",

            },
            isFocusOutDesc: false,
            isFocusOut: false,
            contents: [],
            codes: [],
            onBlurCodes: [],
            onBlurContents: [],
        }
    }

    createPost = (event) => {
        event.preventDefault()
        var post = new Post()
        post.title = this.state.title
        const slicArr = this.state.contents.slice();
        this.state.contents.map((content, index) => {
            const value = JSON.stringify(convert(draftToHtml(convertToRaw(content.getCurrentContent()))))
            slicArr[index] = value
        })
        post.contents = slicArr
        post.codes = this.state.codes
        console.log(post)
        axios.post("http://localhost:8080/create-post", post)
        .then(res => {
            console.log(res)
        })
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
            
            case "description":
                if(value === "") {
                    error = {...this.state.error}
                    error.descriptionError = "*Field Required"
                    this.setState({
                        error,
                        description: value,
                    })
                } else if(value.length < 10) {
                    error = {...this.state.error}
                    error.descriptionError = "*Should be minimum of 10 characters"
                    this.setState({
                        error,
                        description: value
                    })
                } else {
                    error = {...this.state.error}
                    error.descriptionError = ""
                    this.setState({
                        error,
                        description: value,
                    })
                }
                break;

            default:
                break;
        }
    }

    handleContentChange = (editorState, index) => {
        const slicArr = this.state.contents.slice();
        slicArr[index] = editorState;
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

    handleFocusOutDesc = (event) => {
        event.preventDefault();
        this.setState({
            isFocusOutDesc: true
        })
    }

    handleChangeTitle = (event, value) => {
        event.preventDefault();
        if(event.target.value) {
            value = event.target.value
        }
        if(value.length > 0) {
            this.setState({
                isFocusOut: false
            })
        } else {
            this.setState({
                isFocusOut: true
            })
        }
    }

    handleChangeDesc = (event, value) => {
        event.preventDefault();
        if(event.target.value) {
            value = event.target.value
        }
        if(value.length > 0) {
            this.setState({
                isFocusOutDesc: false
            })
        } else {
            this.setState({
                isFocusOutDesc: true
            })
        }   
    }

    handleChangeCode = (event, index) => {
        event.preventDefault();
        const slicFocusCodes = this.state.onBlurCodes.slice();
        slicFocusCodes[index] = false
        this.setState({
            onBlurCodes: slicFocusCodes
        })
    }

    handleChangeContent = (event, index) => {
        event.preventDefault();
        const slicFocusContents = this.state.onBlurContents.slice();
        slicFocusContents[index] = false
        this.setState({
            onBlurContents: slicFocusContents 
        })
    }

    handleAddContent = (event) => {
        event.preventDefault();
        const slicArr = this.state.contents.slice();
        const slicCode = this.state.codes.slice();
        const slicFocusCodes = this.state.onBlurCodes.slice();
        const slicFocusContents = this.state.onBlurContents.slice();
        slicCode.push("");
        slicArr.push("");
        slicFocusCodes.push(false)
        slicFocusContents.push(false)
        this.setState({
            contents: slicArr,
            codes: slicCode,
            onBlurCodes: slicFocusCodes,
            onBlurContents: slicFocusContents,
        })
    }

    handleCodesFocus = (event, i) => {
        event.preventDefault();
        const slicFocusCodes = this.state.onBlurCodes.slice();
        if(this.state.codes[i].length > 0) {
            slicFocusCodes[i] = true
        } else {
            slicFocusCodes[i] = false
        }
        this.setState({
            onBlurCodes: slicFocusCodes
        })
    }

    handleContentFocus = (event, i) => {
        event.preventDefault();
        const slicFocusContents = this.state.onBlurContents.slice();
        if(this.state.contents[i].getCurrentContent().getPlainText().length > 0) {
            slicFocusContents[i] = true
        } else {
            slicFocusContents[i] = false
        }
        this.setState({
            onBlurContents: slicFocusContents
        })
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
                            </button><br/>
                        </div>
                    </div>
                    <form>
                        {(!this.state.isFocusOut || this.state.title === "") ?
                        <div className="form-group">
                            <label htmlFor="title"><h5><b>Title</b></h5></label>
                            <input type="text" className="form-control"
                                    placeholder="Enter title" required
                                    name="title"
                                    id="title"
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
                                    <button className="no-link" 
                                    onClick={(event) => this.handleChangeTitle(event, this.state.title)}>
                                        <h5 className="edit-color"><MdEdit className="pr-1"/>Edit</h5>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <h2 className="site-color"><b>{this.state.title}</b></h2><br/>
                        </div>}
                        {(!this.state.isFocusOutDesc || this.state.description === "" || this.state.description.length < 10) ?
                        <div className="form-group">
                            <label htmlFor="title"><h5><b>Description</b></h5></label>
                            <input type="text" className="form-control"
                                    placeholder="Description" required
                                    name="description"
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusOutDesc}/>
                            {(this.state.error.descriptionError) ? 
                            <div className="pt-1">
                                <b className="text-danger">{this.state.error.descriptionError}</b>
                            </div> : null}
                        </div> : 
                        <div>
                            <div className="row">
                                <div className="col">
                                    <h5><b>Description</b></h5>
                                </div>
                                <div className="col float-left">
                                    <button className="no-link" 
                                    onClick={(event) => this.handleChangeDesc(event, this.state.description)}>
                                        <h5 className="edit-color"><MdEdit className="pr-1"/>Edit</h5>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <h4><b>{this.state.description}</b></h4><br/>
                        </div>}
                        {this.state.contents.length > 0 ? 
                        <div>
                            {this.state.contents.map((values, i) => {
                                return (
                                    <div className="form-group" key={i}>
                                        {(!this.state.onBlurContents[i]) ? 
                                        <div>
                                            <label htmlFor="content"><h5><b>Content</b></h5></label>
                                            <Editor  id="content" className="form-control"
                                            editorClassName="content"
                                            editorState={values}
                                            placeholder="type here..."
                                            onBlur={(event) => this.handleContentFocus(event, i)}
                                            onEditorStateChange={(event) => this.handleContentChange(event, i)} 
                                            required /><br/>
                                        </div> : 
                                        <div>
                                        <div className="row">
                                            <div className="col">
                                                <h5><b>Content</b></h5>
                                            </div>
                                            <div className="col float-left">
                                                <button className="no-link" 
                                                onClick={(event)=>this.handleChangeContent(event, i)}>
                                                    <h5 className="edit-color"><MdEdit className="pr-1"/>Edit</h5>
                                                </button>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div>
                                            <h5>{convert(draftToHtml(convertToRaw(values.getCurrentContent())))}</h5><br/>
                                        </div>
                                    </div>}
                                        {(!this.state.onBlurCodes[i]) ? 
                                        <div>
                                            <label htmlFor="code"><h5><b>Code</b></h5></label>
                                            <textarea id="code" className="form-control"
                                            name="code"
                                            value={this.state.codes[i]}
                                            onChange={(event) => this.handleCodeChange(event, i)} 
                                            required
                                            onBlur={(event) => this.handleCodesFocus(event, i)}></textarea>
                                        </div>: 
                                            <div>
                                                <div className="row">
                                                    <div className="col">
                                                        <h5><b>Code</b></h5>
                                                    </div>
                                                    <div className="col float-left">
                                                        <button className="no-link" 
                                                        onClick={(event)=>this.handleChangeCode(event, i)}>
                                                            <h5 className="edit-color"><MdEdit className="pr-1"/>Edit</h5>
                                                        </button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div>
                                                <pre className="language-c">
                                                                <code>
                                                                    {this.state.codes[i]}
                                                                </code>
                                                </pre>
                                                </div>
                                            </div>
                                            
                                        }
                                    </div>
                                );
                            })}
                        </div>:null} 
                        {(this.state.contents.length > 0) ? <div>
                            <button className="btn btn-dark" onClick={this.createPost}>Submit</button>
                        </div>:null}
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBlog;
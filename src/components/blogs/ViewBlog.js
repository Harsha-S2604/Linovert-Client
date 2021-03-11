import React, {Component} from 'react'
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js'
import draftToHtml from "draftjs-to-html";
import convert from 'htmr';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import "prismjs/components/prism-jsx.min.js";

class ViewBlog extends Component {

    componentDidMount() {
        Prism.highlightAll()
    }

    render() {
        const image = require('../../assets/'+this.props.location.state.post.Id+'.jpg')
        return (
            <div className="view-blog-padding">
                <h1 className="site-color"><b>{this.props.location.state.post.Title}</b></h1><br/>
                <p className="text-secondary">{this.props.location.state.post.CreatedOn}</p>
                <h5 className="site-color">{this.props.location.state.post.Description}</h5>
                <hr/>
                <br/>
                <br/>
                <img className="card-img-top img-fluid" src={image.default} alt={this.props.location.state.post.Title}/>
                {
                    this.props.location.state.post.Contents.map((value, index) => {
                        const content = EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
                        return (
                            <div key={index}>
                                {<p>{convert(draftToHtml(convertToRaw(content.getCurrentContent())))}</p>}<br/>
                                
                                {this.props.location.state.post.Codes[index].length > 0 ? <pre className="language-c">
                                    <code>
                                        {this.props.location.state.post.Codes[index]}
                                    </code>
                                </pre> : null}

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ViewBlog
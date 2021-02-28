import {React, Component} from 'react';

class AddBlog extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
    }

    render() {
        return (
            <div className="blog-padding">
                <div className="container-fluid">
                    <h2 className="site-color"><b>Create Blog</b></h2><br/>
                    <form>
                        <div className="form-group">
                            <label for="title"><h5><b>Title</b></h5></label>
                            <input type="text" className="form-control"
                                    placeholder="Enter title" required
                                    name="title"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBlog;
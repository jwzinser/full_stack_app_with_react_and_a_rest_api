import React, { Component } from 'react'
import axios from 'axios';
class UpdateCourse extends Component {
    state = {
        id:"",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors:""
    }

    componentDidMount(){
        //get all the current course info and set them into state
        const id = this.props.match.params.id;

        if(id !== 'create'){
            axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((course) => {console.log(course)
                    this.setState({
                        id:course.data.User.id,
                        title: course.data.title,
                        description:course.data.description,
                        estimatedTime:course.data.estimatedTime,
                        materialsNeeded:course.data.materialsNeeded
                    })
                }).then(() => {
                    //if the user does not own the course, redirect to forbidden
                    const context = this.props.context;
                    if((context.authUser && (context.authUser.id !== this.state.id))){
                        this.props.history.push('/forbidden')
                    }
                }).catch((e) => {
                    if(e){
                        this.props.history.push('/notfound') //if requested course not exist, redirect to notfound
                    }
            })
        }
    }

    //submit the form to update a course
    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const context = this.props.context;
        const { title , description, estimatedTime, materialsNeeded } = this.state;
        const axiosInstance = axios.create({
            baseURL:`http://localhost:5000`,
            headers: {
                "Authorization": `Basic ${context.encodedCredentials}`,
                "Content-Type": "application/json"
            }
        });
       
        axiosInstance.put(`/api/courses/${id}`,
            {
                title, 
                description, 
                estimatedTime, 
                materialsNeeded
            }
        )
            .then(() => {
                this.props.history.push(`/courses/${id}`) //redirect back to the main courses page
            })
            .catch((e) => {
                this.setState({
                    errors: e.response.data.errors //catch the err in the response object
                })
                //if unaut, then forbidden to access the resources
                if(e.response.status === 403){
                    this.props.history.push('/forbidden')
                }
            })
    }
    //set the value fields into state
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    //when click cancel, redirect to default
    handleCancel = () => {
        this.props.history.push('/')
    }
    render() {
        
        return (
            <div>
                <div>
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <div>
                        {
                            this.state.errors ? (
                                <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                        <div className="validation-errors">
                                            <ul>
                                                {
                                                    this.state.errors.map((error) => {
                                                        return <li key={error}>{error}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ) :  null
                            }
                        </div>
                            <form>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                className="input-title course--title--input" 
                                                placeholder="Course title..."
                                                value={this.state.title}
                                                onChange={this.handleChange} 
                                            />
                                        </div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                className="" 
                                                placeholder="Course description..."
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime" 
                                                    name="estimatedTime" 
                                                    type="text" 
                                                    className="course--time--input"
                                                    placeholder="Hours" 
                                                    value={this.state.estimatedTime}
                                                    onChange={this.handleChange}
                                                />
                                                </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded" 
                                                    className="" 
                                                    placeholder="List materials..."
                                                    value={this.state.materialsNeeded}
                                                    onChange={this.handleChange}
                                                >
                                                </textarea>
                                            </div>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button 
                                        className="button" 
                                        type="submit"
                                        onClick={this.handleSubmit}
                                    >
                                       Update Course
                                    </button>
                                    <button 
                                        className="button button-secondary" 
                                        onClick={this.handleCancel}
                                    >
                                    Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateCourse;

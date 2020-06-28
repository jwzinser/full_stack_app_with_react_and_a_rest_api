import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


class Course extends Component {

    state = {
        courses: []
    }

    componentDidMount(){
        //call the api to get the list of courses when rendering
        axios.get('http://localhost:5000/api/courses')
            .then((courses) => {
                this.setState({
                    courses: courses.data
                })
            }).catch((e)=>{
            if(e){
                this.props.history.push('/error'); //redirect to error when error not handled
            }              
        })
    }
    
    render(){
        //rendering courses array with map func
        const course = this.state.courses.map((course,index) => {
            return (
                //<div key={course.id} className="bounds">
                    <div key={course.id} className="grid-33">
                    <NavLink 
                        to={`/courses/${course.id}`}
                        className="course--module course--link"
                    >
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </NavLink>
                    </div>
                //</div>
            )
        })

        const courseCreate = 
            <div className="grid-33">
                <NavLink 
                    to="/courses/create"
                    className="course--module course--add--module"
                >
                <h3 className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                        New Course
                </h3>
                </NavLink>
            </div>

        return(
            <div className="bounds">
                {course}
                {courseCreate}
            </div>    
        )
    }
}

export default Course;
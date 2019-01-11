import React from 'react'
import { fetchCategories } from "../actions/cloudinaryActions";
import { addItem } from "../actions/closetActions";
import { connect } from 'react-redux';
import { categoryOptions } from "../types";
import { Form, Image } from 'semantic-ui-react'

// import axios from 'axios';
// import { Image, Video, Transformation, CloudinaryContext } from "cloudinary-react";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;


class Cloudinary extends React.Component {
  state = { itemImg: "", itemName: "", itemCat: "", options: []};

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleNameChange = event =>{
    this.setState({...this.state, itemName: event.target.value})
  }
  handleDropdownChange = event =>{
    this.setState({ ...this.state, itemCat: event.target.textContent})
  }

  handleFormSubmit = event =>{
    event.preventDefault()
    let foundCategory = this.props.category.find((e) => { return e.name === this.state.itemCat.toLowerCase() })
    this.props.addItem(this.state.itemName, this.state.itemImg, foundCategory.id, this.props.userId);
  }

  renderForm = () =>{
    return <Form onSubmit={e => this.handleFormSubmit(e)}>
          <Image src={this.state.itemImg} alt="test" />
      <Form.Group widths="equal" >
        <Form.Select fluid label="Category" name="category" options={categoryOptions} placeholder="Category" onChange={this.handleDropdownChange}/>
        <Form.Input fluid label="Name" name="photoName" placeholder="Name" value={this.state.itemName} onChange={this.handleNameChange} />
      </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>;
  }

  handleClick = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({itemImg: result.info.url})
        }
      }
    ).open()
  };

  render() {
    console.log("inside cloudinary props are", this.props)
    return <div className="card">
        <button onClick={this.handleClick} id="upload_widget" className="cloudinary-button ui button">
          Image
        </button>
        {this.state.itemImg.length > 0 ? this.renderForm() : null}
      </div>;
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {category: state.category.category, userId: state.user.userId}
}

// (this.state.itemName, this.state.itemImg, categoryId, this.props.userId)
const mapDispatchToProps = (dispatch) => {
  return { fetchCategories: id => dispatch(fetchCategories(id)), addItem: (name, img, catId, userId) => dispatch(addItem(name, img, catId, userId)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloudinary);
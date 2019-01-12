import React from 'react'
import { fetchCategories } from "../actions/cloudinaryActions";
import { addItem } from "../actions/closetActions";
import { connect } from 'react-redux';
import { categoryOptions } from "../types";
import { Form, Image } from 'semantic-ui-react'
import withAuth from "../hoc/withAuth";
import { Redirect } from "react-router";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class Cloudinary extends React.Component {
  state = { itemImg: "", itemName: "", itemCat: 0, addingItem: true};

  componentDidMount() {
    this.props.fetchCategories()
      window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({ itemImg: result.info.url })
        }
      }
    ).open()
  }

  handleNameChange = event =>{
    this.setState({...this.state, itemName: event.target.value})
  }
  handleDropdownChange = event =>{
    let foundCategory = this.props.category.find((e) => { return e.name.toLowerCase() === event.target.textContent.toLowerCase() })
    this.setState({ itemCat: foundCategory.id}, () => {console.log(this.state.itemCat)})
  }

  handleFormSubmit = event =>{
    event.preventDefault()
    this.setState({addingItem: false})
    this.props.addItem(this.state.itemName, this.state.itemImg, this.state.itemCat, this.props.userId)
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


  render() {
    return !this.state.addingItem ? (
      <Redirect to="/closet" />
    ) : (
     <div className="card">
        {this.state.itemImg.length > 0 ? this.renderForm() : null}
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {category: state.category.category, userId: state.user.userId, isLoaded: state.closet.isLoaded}
}


const mapDispatchToProps = (dispatch) => {
  return { fetchCategories: id => dispatch(fetchCategories(id)), addItem: (name, img, catId, userId) => dispatch(addItem(name, img, catId, userId)) };
}

export default withAuth(connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloudinary));
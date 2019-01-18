import React from 'react'

import { addItem } from "../actions/closetActions";
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Image} from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import { Redirect } from "react-router";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_SETTING = process.env.REACT_APP_CLOUDINARY_SETTING;

class Cloudinary extends React.Component {
  state = { itemImg: "", itemName: "", itemCat: 0, addingItem: true};

  componentDidMount() {
      window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            itemImg: `http://res.cloudinary.com/${MY_CLOUD_NAME}/image/upload/${CLOUD_SETTING}/${
              result.info.path
            }`
          });
        }
      }
    ).open()
  }

  handleNameChange = event =>{
    this.setState({...this.state, itemName: event.target.value})
  }
  handleDropdownChange = event =>{
    if (event.target.value !== "" && this.props.category.length > 0) {
      let foundCategory = this.props.category.find((e) => { return e.name.toLowerCase() === event.target.value.toLowerCase() })
      this.setState({ itemCat: foundCategory.id}, () => {console.log(this.state.itemCat)})
    }
  }

  handleFormSubmit = event =>{
    event.preventDefault()
    this.setState({addingItem: false})
    this.props.addItem(this.state.itemName, this.state.itemImg, this.state.itemCat, this.props.userId)
  }

  renderForm = () =>{
    return <form onSubmit={e => this.handleFormSubmit(e)}>
        <Image src={this.state.itemImg} alt="item to add" />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Add information about your piece!</ControlLabel>
          <select placeholder="select" onChange={this.handleDropdownChange}>
            <option value="">Select a category</option>
            <option value="Activewear">Activewear</option>
            <option value="Dresses">Dresses</option>
            <option value="Outerwears">Outerwears</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Sweatshirts">Sweatshirts</option>
            <option value="Tops">Tops</option>
            <option value="Shoes">Shoes</option>
            <option value="Misc">Misc</option>
          </select>
          <FormControl type="text" value={this.state.itemName} placeholder="Enter Name" onChange={this.handleNameChange} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>;
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
  console.log(state)
  return {category: state.category.category, userId: state.user.userId, isLoaded: state.closet.isLoaded}
}


const mapDispatchToProps = (dispatch) => {
  return {  addItem: (name, img, catId, userId) => dispatch(addItem(name, img, catId, userId)) };
}

export default withAuth(connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloudinary));
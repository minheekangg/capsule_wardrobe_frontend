import React from 'react'

import { addItem } from "../actions/closetActions";
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Image} from "react-bootstrap";
import withAuth from "../hoc/withAuth";
import { Redirect } from "react-router";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class Cloudinary extends React.Component {
  state = { itemImg: "", itemName: "", itemCat: 0};

  componentDidMount() {
      window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            itemImg: `http://res.cloudinary.com/${MY_CLOUD_NAME}/image/upload/w_300,h_300,c_lpad,b_white/${
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
    this.props.addItem(this.state.itemName, this.state.itemImg, this.state.itemCat, this.props.userId)
  }

  renderForm = () =>{
    return <form onSubmit={e => this.handleFormSubmit(e)} className="newItemForm">
        <Image src={this.state.itemImg} alt="item to add" />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Add information about your piece!</ControlLabel>
        <FormControl componentClass="select" style={{ width: "70vh", marginLeft: "30%" }} onChange={this.handleDropdownChange}>
            <option value="select">Category</option>
            <option value="Activewear">Activewear</option>
            <option value="Dresses">Dresses</option>
            <option value="Outerwears">Outerwears</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Sweatshirts">Sweatshirts</option>
            <option value="Tops">Tops</option>
            <option value="Shoes">Shoes</option>
            <option value="Misc">Misc</option>
          </FormControl>
          <FormControl type="text" style={{width: "70vh", marginLeft: "30%"}} value={this.state.itemName} placeholder="Enter Name" onChange={this.handleNameChange} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>;
  }


  render() {
    return this.props.addedItem ? (
      <Redirect to="/closet" />
    ) : (
     <div className="card">
          <div className="fakeNavbar" style={{ backgroundColor: "#1D4306", marginTop: "-1vh"}} />{this.state.itemImg.length > 0 ? this.renderForm() : null}
      </div>
    )

  }
}

const mapStateToProps = state => {
  console.log(state)
  return {category: state.category.category, userId: state.user.userId, addedItem: state.closet.addedItem}
}


const mapDispatchToProps = (dispatch) => {
  return {  addItem: (name, img, catId, userId) => dispatch(addItem(name, img, catId, userId)) };
}

export default withAuth(connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloudinary));
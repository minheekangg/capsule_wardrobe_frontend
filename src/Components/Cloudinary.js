import React from 'react'

// import axios from 'axios';
// import { Image, Video, Transformation, CloudinaryContext } from "cloudinary-react";

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class Cloudinary extends React.Component {
  state = { photo: "" };

  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: MY_CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET
    },
    (error, result) => {
      if (result && result.event === "success") {
        this.setState({
          photo: result.info.url
        });
      }
    }
  );

  handleChange = e => {
    debugger;
    console.log(e);
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
  };
  // axios.post({
  //   url: CLOUDINARY_URL,
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   data: formData
  // }).then(res => {
  //   console.log(res)
  //   imgPreview.src = res.data.secure_url
  // })
  //   .catch(err => console.log(err))
  // }

  // <img src="http://fillmurray.com/g/300/300" id="img-preview" alt="test"/>
  // <label class="file-upload-container" for="file-upload" onChange={(e)=>handleChange(e)}>
  //   <input id="file-upload" type="file" style={{"display": "none"}}/>
  // </label> <br/>
  // <button id="upload_widget" class="cloudinary-button" onClick={}>Upload files</button>

  handleClick = event => {
    this.widget.open();
  };
  render() {
    return (
      <div className="card">
        <button
          onClick={this.handleClick}
          id="upload_widget"
          className="cloudinary-button ui button"
        >
          Image
        </button>
        {this.state.photo.length > 0 ? (
          <img src={this.state.photo} alt="testing" />
        ) : null}
      </div>
    );
  }
}
export default Cloudinary
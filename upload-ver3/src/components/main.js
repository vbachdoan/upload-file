import React from "react";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listFiles: undefined,
      style: {
        width: "0",
      },
      filesInfor: [],
      dataFiles: [],
      signal: "",
      fileDelete: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteServerSide = this.handleDeleteServerSide.bind(this);
    this.handleAllUpload=this.handleAllUpload.bind(this);
  }

  handleChange(event) {
    let selected = event.target.files;
    let passData = [];
    for (let i = 0; i < selected.length; i++) {
      passData.push(selected[i]);
    }
    this.setState({
      listFiles: passData,
    });
  }

  handleUpload(fileUp) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/admin/upload");

    xhr.upload.addEventListener("progress", (event) => {
      let fileLoaded = Math.floor((event.loaded / event.total) * 100);
      console.log(fileLoaded);
      this.setState({
        style: {
          width: `${fileLoaded}%`,
        },
      });
    });
    
    let formData = new FormData();
    formData.append("file", fileUp);
    xhr.send(formData);
  }

  handleAllUpload() {
    for (let i = 0; i < this.state.listFiles.length; i++) {
      this.handleUpload(this.state.listFiles[i]);
    }

  }
  handleDelete(item) {
    const listFiles = this.state.listFiles.filter((i) => i !== item);
    this.setState({ listFiles });
  }

  handleDeleteServerSide(fileSelected) {
    let filename = new FormData();
    alert(`start delete${fileSelected}`);
    filename.append("filename", fileSelected);
    fetch("http://localhost:8080/admin/delete", {
      method: "DELETE",
      body: filename,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          dataFiles: result,
          signal: "deleted",
        });
        alert(this.state.signal);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    fetch("http://localhost:8080/admin/files")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          dataFiles: result,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
        <div id="wrap-upload-field">
          <form action="#" onChange={this.handleChange} id="upload-box">
            <input
              className="file-input"
              type="file"
              id="upload-field"
              hidden
              multiple
            />
            <label htmlFor="upload-field" id="upload-field-label">
              Upload Files
            </label>
          </form>
          <div id="display-selected-files">
            {this.state.listFiles && (
              <div id="wrap-selected">
                {this.state.listFiles.map((file) => (
                  <div className="file-block">
                    <p>File type: {file.type}</p>
                    <p>File name: {file.name}</p>
                    <div
                      className="delete-btn"
                      onClick={this.handleDelete.bind(this, file)}
                    >
                      Delete
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div id="btn" onClick={this.handleAllUpload}>
              Upload
            </div>
            <div id="progress">
              <span style={this.state.style}></span>
            </div>
          </div>
        </div>
        <div id="wrap-files">
          {this.state.dataFiles &&
            this.state.dataFiles.map((file, key) => (
              <div className="file-block" key={key}>
                <p>File type: type of {file.extension}</p>
                <p>File name: {file.filename}</p>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "red",
                  }}
                  onClick={() => this.handleDeleteServerSide(file.filename)}
                ></div>
              </div>
            ))}
        </div>
      </>
    );
  }
}

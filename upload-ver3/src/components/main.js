import React from 'react';

export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state={
            listFiles : []
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
    }

    handleChange(event){
        let selected = event.target.files;
        this.setState({
            listFiles : selected,
        })
    }

    handleUpload(){

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/admin/upload");

        // xhr.upload.addEventListener('progress',(event)=>{
        //     let fileLoaded = Math.floor((event.loaded / event.total) * 100);
        //     console.log(fileLoaded)
        //     this.setState({
        //         style:{
        //             width: `${fileLoaded}%`
        //         }
        //     })
        // })

        let formData = new FormData();
        for(let i=0;i<this.state.listFiles.length;i++){
            formData.append('file',this.state.listFiles[i]);
        }  

        xhr.send(formData)
        console.log(formData);
    }

    render(){
        return(
            <>
            <div id="wrap-upload-field">
                <form action="#" onClick={this.handleClick} onChange={this.handleChange} id="upload-box">
                    <input className="file-input" type="file" id="upload-field" hidden multiple/>
                    <label htmlFor="upload-field" id="upload-field-label">Upload Files</label>
                </form>
            </div>
            <div id="btn" onClick={this.handleUpload}>Upload</div>
            </>

        )
    }
}
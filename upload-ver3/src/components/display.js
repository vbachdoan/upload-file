import React from 'react';

export default class Display extends React.Component{

    constructor(props){
        super();
        this.state = {
            filesInfor: [],
            dataFiles : [],
            signal: "",
            fileDelete:""
        }
    }

    handleDelete(file){
        let formData = new FormData();
        formData.append('filename',file.filename);
        this.setState({
            fileDelete: file
        })
        fetch('http://localhost:8080/admin/delete/', {
                method: 'DELETE',
                body: formData
            }).then(response => response.json())
            .then(result => {
                this.setState({
                    dataFiles: result,
                    signal: "deleted"
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount(){
        fetch("http://localhost:8080/admin/files")
            .then(response => response.json())
            .then(result => {
                this.setState({
                    dataFiles: result})
            })
            .catch(e => {
                console.log(e);
            });
    }

    render(){
        return(
            <>
            <div id="wrap-files">
                {this.state.dataFiles && this.state.dataFiles.map(file=>
                    <div className="file-block">
                        <p>File type: type of {file.filename}</p>
                        <p>File name: {file.extension}</p>
                        <div style={{width: "40px", height: "40px", backgroundColor:"red"}} onClick={(file)=>this.handleDelete(file)}></div>
                    </div>
                )}
            </div>
            </>
        )
    }
}
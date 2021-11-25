import React from 'react';

export default class Display extends React.Component{

    constructor(props){
        super();
        this.state = {
            filesInfor: [],
            dataFiles : [],
        }
    }

    // handleDelete(file){
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", "http://localhost:8080/delete");
    //     xhr.send(file);
    // }

    componentDidMount(){
        fetch("http://localhost:8080/Listfiles")
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
                    </div>
                )}
            </div>
            </>
        )
    }
}
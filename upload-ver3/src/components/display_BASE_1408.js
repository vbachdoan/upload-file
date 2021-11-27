import React from 'react';

export default class Display extends React.Component{

    constructor(props){
        super();
        this.state = {
            filesInfor: [],
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleDelete(file){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/delete");
        xhr.send(file);
    }

    componentWillMount(){
        let dataFiles = [];
        fetch('http://localhost:8080/files')
            .then(response => response.json())
            .then(data => {
                dataFiles = data;
            });
        this.setState({
            filesInfor: dataFiles
        })
    }

    render(){
        return(
            <>
            <div id="wrap-files">
                {this.state.dataFiles.map(file=>
                    <div className="file-block">
                        <p>File type: {file.type}</p>
                        <p>File name: {file.name}</p>
                        <div className="delete-btn" onClick={this.handleDelete.bind(file)}>Delete</div>
                    </div>
                )}
            </div>
            </>
        )
    }
}
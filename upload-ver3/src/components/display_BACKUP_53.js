import React from 'react';

export default class Display extends React.Component{

    constructor(props){
        super();
        this.state = {
            filesInfor: [],
            dataFiles : [],
        }
<<<<<<< Updated upstream
=======
        // this.handleDelete=this.handleDelete.bind(this);
>>>>>>> Stashed changes
    }
    // handleDelete(file){
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", "http://localhost:8080/delete");
    //     xhr.send(file);
    // }

<<<<<<< Updated upstream
    // handleDelete(file){
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", "http://localhost:8080/delete");
    //     xhr.send(file);
    // }

    componentDidMount(){
        fetch("http://localhost:8080/Listfiles")
=======
    handleClick(){
        let dataFiles = [];
        fetch('http://localhost:8080/admin/files')
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <p>File type: type of {file.filename}</p>
                        <p>File name: {file.extension}</p>
=======
                        <p>File type: {file.type}</p>
                        <p>File name: {file.name}</p>
                        {/* <div className="delete-btn" onClick={this.handleDelete.bind(file)}>Delete</div> */}
>>>>>>> Stashed changes
                    </div>
                )}
            <div style={{width: "40px", height: "40px", backgroundColor:"red"}} onClick={this.handleClick}></div>
            </div>
            </>
        )
    }
}
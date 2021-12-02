import React from 'react';

export default class Display extends React.Component{

    constructor(){
        super();
        this.state = {
            filesInfor: [],
            dataFiles : [],
            signal: "",
            fileDelete:""
        }
        this.handleDelete=this.handleDelete.bind(this);
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
                alert(this.state.signal)
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
                {this.state.dataFiles && this.state.dataFiles.map((file, key)=>
                    <div className="file-block" key={key}>
                        <p>File type: type of {file.extension}</p>
                        <p>File name: {file.filename}</p>
                        <div style={{width: "40px", height: "40px", backgroundColor:"red"}} onClick={()=>this.handleDelete(file.filename)}></div>
                    </div>
                )}
            </div>
            </>
        )
    }
}
import React from 'react';

export default class Display extends React.Component{

    constructor(){
        super();
        this.state = {
            filesInfor: [],
            dataFiles : [],
            signal: "",
            fileDelete:"",
        }
        this.handleDelete=this.handleDelete.bind(this);
    }

    handleDelete(fileSelected){
        let filename = new FormData();
        alert(`start delete${fileSelected}`)
        filename.append("filename",fileSelected)
        fetch('http://localhost:8080/admin/delete', {
                method: 'DELETE',
                body: filename
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
                {this.state.dataFiles && this.state.dataFiles.map((filename, key)=>
                    <div className="file-block" key={key}>
                        <p>File type: type of {filename}</p>
                        <p>File name: {filename}</p>
                        <div style={{width: "40px", height: "40px", backgroundColor:"red"}} onClick={()=>this.handleDelete(filename)}></div>
                    </div>
                )}
            </div>
            </>
        )
    }
}
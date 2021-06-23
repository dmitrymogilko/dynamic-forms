import React from 'react';
import axios from 'axios';
import Form from "@rjsf/core";
import { Button } from 'antd';


const log = (type) => console.log.bind(console, type);


export default class App extends React.Component {
    state = {
        schema : {},
        formData: {},
        currentScmType:'jira'
    }

    componentDidMount() {
        this.setScmForm(this.state.currentScmType);
    }

    setScmForm(scmId){
        // form itself
        const urlForm = `${scmId}.json`;
        axios.get(urlForm)
            .then(res => {
                const schema = res.data;
                this.setState({
                    schema
                });
         });
        //fetch form data
        const  urlFormData = `${scmId}.data.json`;
        axios.get(urlFormData)
            .then(res => {
                const formData = res.data;
                this.setState({
                    formData
                });
            });
    }

    render() {
        return (
            <div>
               <div>
                   <select onChange={event => this.setScmForm(event.target.value)}>
                       <option selected value="jira">Jira</option>
                       <option value="bitbucket">Bitbucket</option>
                       <option value="azure">Azure</option>
                   </select>
               </div>
                <Form schema={this.state.schema}
                  formData={this.state.formData}
                  liveValidate
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")} />
            </div>


        )
    }
}

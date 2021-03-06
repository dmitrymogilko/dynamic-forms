import React from 'react';
import axios from 'axios';
import {useRef} from "react";

import { Button } from 'antd';
import {schemaRequiresTrueValue} from "@rjsf/core/lib/utils";
import { withTheme } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import {Demo} from "./AndAutoComplete";
import 'antd/dist/antd.css'


const Form = withTheme(AntDTheme);

const log = (type) => console.log.bind(console, type);

const validate  = (formData, errors) =>{
    return errors;
}

const onChange = (formData) => {
    console.log(formData);
}

const test = (erros) => alert(erros.length);
const arrayCreatetor = (props) => {
    console.log('proops' , props.schema.items);
   // console.log('args' , args);
    return (
        <div>
           fsfdsfdsf
        </div>
    );
}

const CustomFieldTemplate = (props) => {
    console.log('custom field template' , props);
   // console.log('args' , args);
    return (
        <div>
           fsfdsfdsf
        </div>
    );
}

const uiSchema = {
    "ui:widget": "string"
};

const customMultiSelect  = (props) => {
    console.log('array field' , props);
    return (
        <div>
            <input type="text" />
        </div>
    );
}

const customFields = {
    ArrayField: customMultiSelect,
    sh: customMultiSelect
}

const customFormats = {
  'phone-us': /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/
};



export default class App extends React.Component {
    state = {
        schema : {},
        formData: {},
        currentScmType:'jira'
    }

    componentDidMount() {
        this.setScmForm(this.state.currentScmType);
    }

    validateSchema(){
     console.dir(this.state.schema);

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
                  fields={customFields}
                  customFormats={customFormats}
                      livevalidation
                  validate={validate}
                  onChange={log("changed")}
                  onSubmit={log("submitted")}
                  onError={log("errors")} />
            </div>

        )
    }
}

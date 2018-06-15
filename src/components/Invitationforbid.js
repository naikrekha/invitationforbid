import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import DropdownExampleSelection from './Selection';
import DatePicker from './OpwDatePicker';
import { Form, TextArea } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import DropdownExampleMultipleSelection from './DropDown';
import DropzoneComponent from 'react-dropzone-component';
import './style.css';
var djsConfig = {autoProcessQueue: false ,addRemoveLinks: true}
var eventHandlers = { addedfile: (file) => console.log(file) ,thumbnail: null}

var componentConfig = { postUrl: 'no-url' ,processQueue:'false'};

export default class Invitationforbid extends Component {
  render() {
    return (
        <div className="container">
        <h1 className="well">{this.screentitle}</h1>
        <div className="col-lg-12 well">
          <div className="row">
            <Form id="addpropertyform">
              <div className="row">		
                  <div className=" col-sm-6 form-group">
                    <label>Select Client</label>
                    <DropdownExampleSelection />
                  </div>	
                <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Bid Due Date* </label>
                      <DatePicker />
                    </div>	
                    <div className="col-sm-6 form-group">
                      <label>Work Due Date</label>
                      <DatePicker />
                    </div>	
                </div>
                <div className="col-sm-11 form-group">
                  <label>Description*</label>
                  <TextArea />
                </div>
                <div className="col-lg-12 well">	
                  <div className="row">
                      <div className=" col-sm-8 form-group">
                        <label text-align="left">Select Vendors</label>
                        <DropdownExampleMultipleSelection />
                      </div>  
                  </div>
                </div>
                <br/> <br/>	
                 <div className="col-sm-2 form-group">
                      <label>Attachments*</label>
                      <DropzoneComponent
                     
                       config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig}/>
                  </div>									
              </div>
              <br/>
               <button type="button"  className="col-sm-2 btn btn-lg btn-info">Create Bid</button>	
            </Form> 
          </div>
        </div>
      </div>
    );
  }
}

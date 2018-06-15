/*global google*/
import React, { Component } from 'react';
import NotificationAlert from 'react-notification-alert';

class AddProperty extends Component {

  static propTypes = {
  }

  propertyAddressDetailsComponent = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
    propertytype: 'short_name',
    lotsize: 'short_name',
    sqfootage: 'short_name',
    yearbuilt: 'short_name',
    bedroomCount: 'short_name',
    bathroomCount: 'short_name',
    description: 'long_name'
  };

  constructor(props) {
    super(props);

   // if(!this.props.match.params.propertyID)
      this.screentitle = "Add Property";
   // else
      //this.screentitle = "Update Property";
    
    this.propsPropertyData = {};  

    this.options = {
      place: 'tl',
      message: (
          <div>
              <div>
                  Alert !!!
              </div>
          </div>
      ),
      type: "success",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    }
    this.fillInAddress = this.fillInAddress.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.fromPropertyZillowServiceDataToForm = this.fromPropertyZillowServiceDataToForm.bind(this);
    this.fromPropertyDBDataToForm = this.fromPropertyDBDataToForm.bind(this);
    this.fromFormToPropertyData = this.fromFormToPropertyData.bind(this);    
    this.clearFormFields = this.clearFormFields.bind(this);    
  }

  componentDidMount() {
    this.initAutocomplete();
   /* console.log("AddProperty componentDidMount called ..." + this.props.match.params.propertyID);
    if(this.props.match.params.propertyID){
    fetch('http://ec2-34-229-126-140.compute-1.amazonaws.com:8081/getPropertyDetails/'+this.props.match.params.propertyID)
    .then(response => response.json())
      .then(data => 
      {
        console.log(data);
        this.setState({propsPropertyData: data})
        this.refs["street_number"].value = data['street_number'];
        this.refs["route"].value =  data['route'];      
        this.refs["locality"].value =  data['locality'];
        this.refs["administrative_area_level_1"].value =  data['administrative_area_level_1'];
        this.refs["country"].value = data['country'];
        this.refs["postal_code"].value =  data['postal_code'];
        this.refs["propertytype"].value = data['propertytype'];
        this.refs["lotsize"].value =  data['lotsize'];      
        this.refs["sqfootage"].value =  data['sqfootage'];
        this.refs["yearbuilt"].value =  data['yearbuilt'];
        this.refs["bedroomCount"].value = data['bedroomCount'];
        this.refs["bathroomCount"].value =  data['bathroomCount'];      
        this.refs["description"].value = data['description'];
      }
    );
    }*/
  }


  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete((this.refs.autocompleteFormField), {types: ['geocode'], componentRestrictions: [`us`],});
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  addProperty() {
    console.log(JSON.stringify(this.propsPropertyData));
    this.fromFormToPropertyData();
    fetch('http://ec2-34-229-126-140.compute-1.amazonaws.com:8081/addProperty/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.propsPropertyData),
  });
    this.options.message = "Property Added Successfully !!!"
    this.options.type = "success"
    this.refs.notify.notificationAlert(this.options);
  }

  fillInAddress() {
  // Get the place details from the autocomplete object.
    this.place = this.autocomplete.getPlace();

    this.clearFormFields();

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.

  this.place.address_components.forEach((component, index) => {
    const addressType = this.place.address_components[index].types[0];
    if (this.propertyAddressDetailsComponent[addressType]) {
      const val = this.place.address_components[index][this.propertyAddressDetailsComponent[addressType]];
      this.refs[addressType].value = val;
    }
  })   

  const address =  this.refs["street_number"].value + " " + this.refs["route"].value;
  const cityStateZip = this.refs["locality"].value + this.refs["administrative_area_level_1"].value + this.refs["postal_code"].value;
  fetch("http://ec2-34-229-126-140.compute-1.amazonaws.com:8080/getPropertyDetails?address="+address+"&cityStateZip="+cityStateZip)
    .then(response => response.json())
      .then(data => {
        this.fromPropertyZillowServiceDataToForm(data);
      });          
  }

  fromPropertyZillowServiceDataToForm(data){
    this.refs["propertytype"].value = data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.useCode;
    this.refs["lotsize"].value =  data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.lotSizeSqFt;      
    this.refs["sqfootage"].value =  data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.finishedSqFt;
    this.refs["yearbuilt"].value =  data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.yearBuilt;
    this.refs["bedroomCount"].value = data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.bedrooms;
    this.refs["bathroomCount"].value =  data['UpdatedPropertyDetails:updatedPropertyDetails'].response.editedFacts.bathrooms      
    this.refs["description"].value = data['UpdatedPropertyDetails:updatedPropertyDetails'].response.homeDescription;
  //this.refs["others"].value = JSON.stringify(data['UpdatedPropertyDetails:updatedPropertyDetails'].response);
  }

  fromPropertyDBDataToForm(data){
    this.refs["street_number"].value = data['street_number'];
    this.refs["route"].value =  data['route'];      
    this.refs["locality"].value =  data['locality'];
    this.refs["administrative_area_level_1"].value =  data['administrative_area_level_1'];
    this.refs["country"].value = data['country'];
    this.refs["postal_code"].value =  data['postal_code'];
    this.refs["propertytype"].value = data['propertytype'];
    this.refs["lotsize"].value =  data['lotsize'];      
    this.refs["sqfootage"].value =  data['sqfootage'];
    this.refs["yearbuilt"].value =  data['yearbuilt'];
    this.refs["bedroomCount"].value = data['bedroomCount'];
    this.refs["bathroomCount"].value =  data['bathroomCount'];      
    this.refs["description"].value = data['description'];
  }  

  fromFormToPropertyData(){
    this.propsPropertyData["street_number"] = this.refs["street_number"].value;
    this.propsPropertyData["route"] = this.refs["route"].value;
    this.propsPropertyData["locality"] = this.refs["locality"].value;
    this.propsPropertyData["administrative_area_level_1"] = this.refs["administrative_area_level_1"].value;
    this.propsPropertyData["country"]  = this.refs["country"].value;
    this.propsPropertyData["postal_code"] = this.refs["postal_code"].value; 
    this.propsPropertyData["propertytype"] = this.refs["propertytype"].value;
    this.propsPropertyData["lotsize"] = this.refs["lotsize"].value;
    this.propsPropertyData["sqfootage"] = this.refs["sqfootage"].value;
    this.propsPropertyData["yearbuilt"] = this.refs["yearbuilt"].value;
    this.propsPropertyData["bedroomCount"]  = this.refs["bedroomCount"].value;
    this.propsPropertyData["bathroomCount"] = this.refs["bathroomCount"].value; 
    this.propsPropertyData["description"] = this.refs["description"].value;
  }


  clearFormFields(){
    document.getElementById("addpropertyform").reset();
  }

  render() {
      return (
          <div className="container">
          <h1 className="well">{this.screentitle}</h1>
          <div className="col-lg-12 well">
            <div className="row">
              <form id="addpropertyform">
                <NotificationAlert ref="notify" />
                <div className="col-sm-12">		
                  <div className="form-group">
                    <label>Lookup Address</label>
                    <input ref="autocompleteFormField" type="text" placeholder="Lookup Address Here.." autoCorrect="off" autoCapitalize="off" spellCheck="off" className="form-control"/>
                  </div>	
                  <div className="row">
                    <div className="col-sm-3 form-group">
                      <label>Street Address 1</label>
                      <input ref="street_number" type="text" className="form-control" />
                    </div>	
                    <div className="col-sm-9 form-group">
                      <label>Street Address 2</label>
                      <input ref="route" type="text" className="form-control" />
                    </div>	
                  </div>
                  <div className="row">
                    <div className="col-sm-3 form-group">
                      <label>City</label>
                      <input ref="locality" type="text" name="city" placeholder="City" className="form-control" />
                    </div>	
                    <div className="col-sm-3 form-group">
                      <label>State</label>
                      <input ref="administrative_area_level_1" type="text" placeholder="State" className="form-control" />
                    </div>	
                    <div className="col-sm-3 form-group">
                      <label>Country</label>
                      <input ref="country" type="text" placeholder="Country" className="form-control" />
                    </div>
                    <div className="col-sm-3 form-group">
                      <label>Zip</label>
                      <input ref="postal_code" type="text" placeholder="Zip Code" className="form-control" />
                    </div>		
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea ref="description" placeholder="Enter Description ..." rows={3} className="form-control" defaultValue={""} />
                  </div>	
                  <div className="row">
                    <div className="col-sm-4 form-group">
                      <label>Type</label>
                      <select ref="propertytype" className="custom-select custom-select-lg mb-3">
                        <option selected />
                        <option value="SingleFamily">Single family</option>
                        <option value="1">Condo</option>
                        <option value="2">Townhouse</option>
                        <option value="3">Multi family</option>
                        <option value="4">Apartment</option>
                        <option value="5">Mobile / Manufactured</option>
                        <option value="6">Coop Unit</option>
                        <option value="7">Vacant land</option>
                        <option value="8">Other</option>
                      </select>
                    </div>		
                    <div className="col-sm-4 form-group">
                      <label>Bed Rooms</label>
                      <input ref="bedroomCount" type="text" placeholder="Ex: 4" className="form-control" />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label>Bath Rooms</label>
                      <input ref="bathroomCount" type="text" placeholder="Ex: 2.5" className="form-control" />
                    </div>
                  </div>	
                  <div className="row">
                    <div className="col-sm-4 form-group">
                      <label>Finished square feet</label>
                      <input ref="sqfootage" type="text" placeholder="Ex: 1,587" className="form-control" />
                    </div>		
                    <div className="col-sm-4 form-group">
                      <label>Lot size</label>
                      <input ref="lotsize" type="text" placeholder="Ex: 7,840" className="form-control" />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label>Year built</label>
                      <input ref="yearbuilt" type="text" placeholder="Ex: 2005" className="form-control" />
                    </div>
                  </div>							
                  <button type="button"  onClick= {this.addProperty} className="btn btn-lg btn-info">{this.screentitle}</button>					
                  <button type="button"  onClick= {this.clearFormFields} className="btn btn-lg btn-info">Clear</button>					
                </div>
              </form> 
            </div>
          </div>
        </div>
      );
  }
} 

export default AddProperty;
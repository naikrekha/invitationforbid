import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
{
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
},
{
    text: 'Jagan',
    value: 'Jagan   ',
    image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
},
]

var axios = require('axios');
const DropdownExampleSelection = () => {
    console.log("DropdownExampleSelection Called ...");  
    axios.get(`http://localhost:8080/get`)
      .then(resp => {
	    console.log(resp.data);
       friendOptions : resp.data;
      });
    (
     <Dropdown placeholder='Select Client' fluid selection options={friendOptions} />
    )
};

export default DropdownExampleSelection
import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: '1', text: 'Air Duct Cleaning', value: 'air duct cleaning' },
  { key: '2', text: 'Alarms', value: 'Alarms' },
  { key: '3', text: 'Appliance Repair - Large', value: 'Appliance Repair - Large' },
  { key: '4', text: 'Appliance Repair - Small', value: 'Appliance Repair - Small' },
  { key: '5', text: 'Bathtub Refinishing', value: 'Bathtub Refinishing' },
  { key: '6', text: 'Carpentry', value: 'Carpentry' },
  { key: '7', text: 'Carpet Cleaning', value: 'Carpet Cleaning' },
  { key: '8', text: 'Ceiling Fans', value: 'Ceiling Fans' },                
  { key: '9', text: 'Ceramic Tile', value: 'Decks and Porches' },
  { key: '10', text: 'Decks and Porches', value: 'Decks and Porches' },
  { key: '11', text: 'Doors', value: 'Doors' },
  { key: '12', text: 'Drain Cleaning', value: 'Drain Cleaning' },
  { key: '13', text: 'Driveways - Asphalt', value: 'Driveways - Asphalt' },
  { key: '14', text: 'Driveways - Concrete', value: 'Driveways - Concrete' },
  { key: '15', text: 'Dryer Vent Cleaning', value: 'Dryer Vent Cleaning' }
]

const DropdownExampleMultipleSelection = () => (
  <Dropdown placeholder='Vendors' fluid multiple selection options={options} />
)

export default DropdownExampleMultipleSelection
import React from 'react';
import {Button, Col} from 'react-bootstrap/lib';

const SelectItemsPerPageButton = ({options, onOptionSelected, selectedValue, allValues}) => {
    return (
      <Col sm={12}>
        {options.map((option) => {
          return (
            <Button key={option} onClick={onOptionSelected} bsStyle={selectedValue === option ? 'primary' : 'default'}>
            {option}</Button>
          )
        })}
          {allValues ?
          <Button key={allValues} onClick={onOptionSelected}
            bsStyle={selectedValue === allValues ? 'primary' : 'default'}>
            All
          </Button>
          : false}
      </Col>
    )
}

export default SelectItemsPerPageButton;

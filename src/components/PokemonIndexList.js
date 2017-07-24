import React from 'react';
import SelectItemsPerPageButton from './SelectItemsPerPageButton';
import PokeList from './PokeList';
import PaginationContainer from './PaginationContainer';

const PokemonIndexList = ({display, options, selectedValue, allValues, onOptionSelected, listOfPokemon, btnSize, totalPages, activePage, onSelect, openModal}) => {
  //console.log('1 openModal=',openModal);
  let style = { display: 'none'}
  if (display) {
    style.display = 'initial'
  } else {
    style.display = 'none'
  }

  return (
    <div style={style}>
      <SelectItemsPerPageButton
        options={options}
        selectedValue={selectedValue}
        allValues={allValues}
        onOptionSelected={onOptionSelected} />

      <PokeList 
        listOfPokemon={listOfPokemon}
        openModal={openModal} />

      <PaginationContainer
        btnSize={btnSize}
        totalPages={totalPages}
        activePage={activePage}
        onSelect={onSelect} />
    </div>
  )
}

export default PokemonIndexList;

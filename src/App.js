import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';

import 'bootstrap/dist/css/bootstrap.css';

//import {Col, Pagination} from 'react-bootstrap/lib';
//import PokeList from './components/PokeList';
//import SelectItemsPerPageButton from './components/SelectItemsPerPageButton';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        pokemon: [],
        activePage: 1,
        limit:50,
        offset:0,
        totalPages: 0,
        count: 0,
        loaded: false,
        showModal: false,
        selectedPokemon: null

      }
      this.loadPokemon = this.loadPokemon.bind(this);
      this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
      this.handleLimitChange = this.handleLimitChange.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(pokemon) {
    if(pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          selectedPokemon: json,
          showModal: true
        })
      })
      .catch(err => {
        console.log('Erro na leitura do pokemon', err)
      })      
    }
    this.setState({
      showModal: true
    })
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }


  handleLimitChange(event) {
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {
        this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`)

    })
  }
  handlePaginationSelect(selectedPage) {
    let offset = this.state.limit * (selectedPage - 1);
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`)
    this.setState({
      activePage: selectedPage
    })
  }


  loadPokemon(url) {
    fetch(url)
      .then( response => {
        return response.json()
      })
      .then(json => {
        let pages = Math.round(json.count / this.state.limit)
        this.setState({
          pokemon: json.results,
          totalPages: pages,
          count: json.count,
          loaded: true
        })
      })
      .catch(err => {
        console.log(err)
      })
    }


    componentWillMount() {
      this.loadPokemon(this.props.baseUrl + `/pokemon?limit=${this.state.limit}`)
    }

  render() {
    //console.log('this.toggleModal=',this.toggleModal);
    return (
      <div className="App">
        {this.state.loaded ? null : "Loading..."}
        <PokemonIndexList
         display={this.state.loaded}
         options={[10,20,50,100,200]}
          selectedValue={this.state.limit}
          allValues={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          btnSize='small'
          totalPages={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePaginationSelect}
          openModal={this.handleOpenModal}

         />
         <PokemonModal closeModal={this.handleCloseModal} showModal={this.state.showModal} pokemon={this.state.selectedPokemon} />
      </div>
    );
  }
}

export default App;

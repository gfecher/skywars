import React, { Component } from 'react';
import styles from './index.scss';
import Pagination from 'react-bootstrap/Pagination'

class StarWars extends Component {
    constructor() {
        super();
        this.state = { loading: true, vehicles: [], total: 0, per_page: 10};
    }    

   componentDidMount() {
    this.fetch(1)
  
  }

    fetch = async pageNumber => {
    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://swapi.co/api/vehicles?page='+ pageNumber)
        const data = await response.json();
        this.setState({ vehicles: data.results , total: data.count, loading: false})
        console.log(this.state.vehicles, this.state.total);
        this.state.loading = false
        
  
      } catch (error) {
          console.log(error);
        }
  }

myFunction() {
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      })}


  render(){
    let renderPageNumbers;
    const pageNumbers = [];
            
    if (this.state.total !== null) {
        for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
          pageNumbers.push(i);
        }
  
        renderPageNumbers = pageNumbers.map(number => {
          let classes = (this.state.next_page -1) === number ? styles.active: ''
  
          return (
            <span key={number} className={'classes'} onClick={() => this.fetch(number)}>{number}</span>
          );
        });
      }
      
      return (
<div>
    {this.state.loading || !this.state.vehicles ? (
        <div> loading...</div>
    ): (<div>
        <h1 style = {{textAlign: 'center'}}>Vehicles </h1>
        <input type="text" id="myInput" onKeyUp= {this.myFunction} placeholder="Search for names.." title="Type in a name"></input>
         <table>
    <tr>
      <th>Name</th>
      <th>Cost In Credits</th>
      <th>Length</th>
    </tr>
        {this.state.vehicles.map((vehicle) => {
            return(
   
    <tr>
      <td>{vehicle.name}</td>
      <td>{vehicle.cost_in_credits}</td>
      <td>{vehicle.length}</td>
    </tr>
   

        );
    })}
      </table>
      <div className={'pagination'}>
          <div style={{marginRight : 30, fontSize : 15, fontWeight: 'bold', alignSelf:'center'}}>Total : {this.state.total}</div>
          {renderPageNumbers}
        </div>


  </div>
      )}
      </div>
      );
      
  }

  
  
}
export default StarWars;
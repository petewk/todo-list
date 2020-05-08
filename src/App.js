import React, { Component } from 'react';
import ToDoList from './Components/ToDoList';
import ToDoInput from './Components/ToDoInput';
import uuid from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

state={
  items:[],
  id: uuid(),
  item:'',
  editItem:false,
};

handleChange = (e) => {
  this.setState({
    item: e.target.value
})
};

handleSubmit = (e) => {
  e.preventDefault();
  const newItem = {
    id:this.state.id,
    title:this.state.item
}
  const updatedItems = [...this.state.items, newItem];
  this.setState({
    items: updatedItems,
    item: '',
    id: uuid(),
    editItem: false
});
  var form = document.getElementById('inputform');
  form.value='';
};

clearList = () => {
  this.setState({
    items: [],
  })
}

handleDelete = (id) => {
  const filteredItems = this.state.items.filter(item => item.id!==id);
  this.setState({
    items: filteredItems,
  })
}

handleEdit = (id) => {
  const filteredItems = this.state.items.filter(item => item.id!==id);
  const selectedItem = this.state.items.find(item => item.id===id);
  this.setState({
    items:filteredItems,
    item:selectedItem.title,
    id:id,
    editItem: true,
  });
  console.log('editing');
  console.log(selectedItem.title);
};

render(){
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-5">
          <h3 className="text-capitalize text-center">To Do List</h3>
          <ToDoInput items={this.state.items} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleEdit={this.state.handleEdit}/>
          <ToDoList items={this.state.items} clearList={this.clearList} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
        </div>
      </div>
    </div>
  );
}
};

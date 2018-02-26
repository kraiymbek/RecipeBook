import React, {Component} from 'react'
import './css/main.css'
import img from './images/randomImg.jpg'
import EditableIngredientList from './EditableIngredientList'
import ToggleableIngredientForm from './ToggleableIngredientForm'
import MenuList from './MenuList'

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfIngredients: [],
      ingredients: [
        "eggs",
        "meat",
        "apple",
        "yoghurt",
        "milk",
        "nuts",
        "orange",
      ],
      isOpen: false,
      menuList: [
        {
          dish_img: img,
          dish_name: "BBQ",
          info: {
            desc: "Lorem ipsum dolor sit amet consectetur anau-minau",
            time: "1 hour"
          },
          ingredients: ["meat", "milk", "banana", "apple"]
        },
        {
          dish_img: img,
          dish_name: "Stuffed Salmon",
          info: {
            desc: "Lorem ipsum dolor sit amet consectetur anau-minau",
            time: "1 hour"
          },
          ingredients: ["yoghurt", "orange", "grape"]
        }
      ],
      menuListSearch: []
    }
  }

  componentDidMount() {
    this.setState({
      menuListSearch: this.state.menuList
    })
  }

  findMenu = (list) => {
    let menuList = this.state.menuList
    let newList = []
    for (let i = 0; i < menuList.length; i++) {
      var counter = 0
      for (let j = 0; j < list.length; j++) {
        let checkList = menuList[i].ingredients.filter((data) => data.toLowerCase() === list[j].name.toLowerCase())
        if (checkList.length > 0) {
          counter += 1
        }
      }
      if (counter > 0) {
        let data = {cnt: counter, list: menuList[i]}
        newList.push(data)
      }
    }
    newList = newList.sort((a, b) => b.cnt - a.cnt)
    var newAns = []
    for (let i = 0; i < newList.length; i++) {
      newAns.push(newList[i].list)
    }
    newAns = list.length > 0 ? newAns : menuList
    this.setState({
      menuListSearch: newAns,
      listOfIngredients: list,
      isOpen: false,
    })
  }

  addToList = (name, number) => {
    this.props.addToBadge()
    let list = this.state.listOfIngredients
    list.push({
      id: guid(),
      name: name,
      number: number,
    })
    this.findMenu(list)
  }

  removeIngredient = (id) => {
    this.props.removeFromBadge()
    let list = this.state.listOfIngredients.filter((data) => data.id !== id)
    this.findMenu(list)
  }

  getIndexById = (id) => {
    let list = this.state.listOfIngredients
    let index = 0
    for (let ind = 0; ind < list.length; ind++) {
      if (list[ind].id === id) {
        index = ind
        break
      }
    }
    return index
  }

  saveEditedIngredient = (data) => {
    let list = this.state.listOfIngredients
    let index = this.getIndexById(data.id)
    list[index].number = data.number
    list[index].name = data.name
    this.findMenu(list)
  }

  handleChangeOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  searchIngredientsByName = (name) => {
    let list = this.state.ingredients.filter((data) => {
      return data.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    this.setState({
      searchList: list
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <EditableIngredientList
              saveEditedIngredient={this.saveEditedIngredient}
              listOfIngredients={this.state.listOfIngredients}
              removeIngredient={this.removeIngredient}
              ingredients={this.state.ingredients}
            />
            <ToggleableIngredientForm
              isOpen={this.state.isOpen}
              addToList={this.addToList}
              onOpenChange={this.handleChangeOpen}
              ingredients={this.state.ingredients}
            />
          </div>
          <div className="col-md-8">
            <MenuList
              listOfIngredients={this.state.listOfIngredients}
              menuListSearch={this.state.menuListSearch}
              ingredients={this.state.ingredients}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
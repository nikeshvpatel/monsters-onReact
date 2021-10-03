import {Component} from 'react';
import {CardList} from "./components/card-list/card-list.component";
import './App.css';
import {SearchBox} from "./components/search-box/search-box.component";


class App extends Component {
    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ''
        }
    }

    async api() {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error(`${response.status}: Unable to fetch API.`);
            return this.setState({monsters: await response.json()});
        } catch (err) {
            console.log(err.message);
        }
    }

    componentDidMount() {
        this.api()
    }

    handleChange = e =>{
        this.setState({searchField: e.target.value})
    }

    render() {
        const {monsters, searchField} = this.state;
        const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))

        return (
            <div className="App">
                <h1>Monster Rolodex</h1>
                <SearchBox placeholder='Search Monsters' handleChange={this.handleChange} />
                <CardList monsters={filteredMonsters}/>

            </div>
        )
    }
}

export default App;

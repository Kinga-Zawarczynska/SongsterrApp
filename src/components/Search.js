import React, { Component } from 'react';

const regex = /[ !"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/
const specialCharacters = [33, 64, 35, 37, 94, 38, 42, 40, 41, 95, 124, 123, 125, 91, 93, 39, 59, 34, 58, 36, 47, 68, 46, 44, 62, 60, 126, 96, 8364, 178, 178, 8800]

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};




export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: props.searchTerm,
            data: [],
            filteredData: [],
            filter: "display",
            bass: false,
            player: false,
            guitar: false,
            chords: false,
            filters: []

        }
    }

    componentDidMount() {
        let filters = []
        if (this.state.bass === true){
           filters.push(this.state.data.filter(item => item.tabTypes.includes("TEXT_BASS_TAB")))
        }
        if (this.state.player === true) {
            filters.push(this.state.data.filter(item => item.tabTypes.includes("PLAYER")))
        }
        if (this.state.guitar === true){
            filters.push(this.state.data.filter(item => item.tabTypes.includes("TEXT_GUITAR_TAB")))
        }
        if (this.state.chords === true){
            filters.push(this.state.data.filter(item => item.tabTypes.includes("CHORDS")))
        }
       
        this.setState({filters: filters})

    }

    setSearchTerm = searchTerm => {
        this.setState({ searchTerm })

    }

    preventSpecialCharacters(event) {
        let x = event.which || event.keyCode;
        if (specialCharacters.includes(x)) {
            event.preventDefault()
        }
    }

    getData = debounce(() => {
        if (this.state.searchTerm !== '') {
            fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${this.state.searchTerm}`, {
                method: 'GET'
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    this.setState({
                        data: data,
                        filteredData: data
                    })
                })
                .then(() => {
                    // this.props.setData(this.state.data)
                    console.log('NOOO')
                    console.log('halo', this.state.searchTerm, this.state.data, this.state.filteredData)
                })
        }

    }, 400, false)
    render() {
        return (
            <div>
                <input
                    type="search" onChange={e => {
                        this.setSearchTerm(e.target.value.replace(" ", "%20") && e.target.value.replace(regex, ""))
                        this.getData()
                    }}
                    onKeyPress={this.preventSpecialCharacters}
                    required
                    maxLength="30"
                    placeholder="Search for..."
                />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="bass"
                            onChange={(e) => {
                                if (e.target.checked) {
                                   let bassFilter = this.state.data.filter(item => this.state.filters.map(filter => {
                                            item.tabTypes.includes(filter)})
                                        ) 
                                         this.setState({
                                            bass: true,
                                            filteredData: bassFilter
                                        
                                    }
                                    )
                                } else {
                                    this.setState({ filteredData: this.state.data })
                                }

                                console.log(this.state.filterdData)
                            }} />
                        <span>Bass</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="player"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    let playerFilter = this.state.data.filter(item => this.state.filters.map(filter => {
                                             item.tabTypes.includes(filter)})
                                         ) 
                                          this.setState({
                                             player: true,
                                             filteredData: playerFilter
                                         
                                     }
                                     )
                                 }else {
                                    this.setState({ filteredData: this.state.data })
                                }

                                console.log(this.state.filterdData)
                            }} />
                        <span>Player</span>
                    </label>

                </div>

                <div>
                    {this.state.filteredData.map(item => {
                        return (
                            <div className={this.state.filter} key={item.id}>
                                <div>
                                    {item.id}
                                </div>
                                <div>{item.title}</div>
                                <div>{item.artist.name}</div>
                                <div>{item.tabTypes.map(item => item + "")}</div>
                            </div>
                        )

                    })}
                </div>

            </div>
        )
    }
}

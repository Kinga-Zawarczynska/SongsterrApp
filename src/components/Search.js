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
            chords: false

        }
    }

    filter() {
        let filters = [];
        let finalData = [];
        let bass;
        let player;
        let guitar;
        let chords;

        if (this.state.bass === true){
        bass = [...new Set([...filters, (this.state.data.filter(item => item.tabTypes.includes("TEXT_BASS_TAB")))])]
        } else if (this.state.bass !== true && filters !== this.state.data) {
            bass = filters
        }
        if (this.state.player === true) {
            player = [...new Set([...filters,(this.state.data.filter(item => item.tabTypes.includes("PLAYER")))])]
        } else if (this.state.player !== true && filters !== this.state.data){
            player = filters 
        }
        if (this.state.guitar === true){
            guitar= [...new Set([...filters,(this.state.data.filter(item => item.tabTypes.includes("TEXT_GUITAR_TAB")))])]
        } else if(this.state.guitar !== true && filters !== this.state.data)  {
            guitar = filters
        }
        if (this.state.chords === true){
            chords= [...new Set([...filters,(this.state.data.filter(item => item.tabTypes.includes("CHORDS")))])]
        } else if (this.state.chords !== true && filters !== this.state.data){
            chords = filters
        }

        let bassReady = [].concat.apply([], bass)
        let playerReady = [].concat.apply([], player)
        let guitarReady = [].concat.apply([], guitar)
        let chordsReady = [].concat.apply([], chords)
        finalData= [...new Set([...bassReady, ...playerReady, ...guitarReady, ...chordsReady])]

        if(this.state.chords !== true && this.state.guitar !== true && 
            this.state.player !== true && this.state.bass !== true) {
                this.setState({filteredData: this.state.data})
            } else {
                this.setState({filteredData: finalData})
            }
       
        
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

    handleCheckBox(e) {
        this.setState({
         bass: e.target.checked
        })
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
                            onChange={(e) => this.setState({
                                bass: e.target.checked
                              })}
                            />
                        <span>Bass</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="player"
                            onChange={(e) => this.setState({
                                player: e.target.checked
                              })} />
                        <span>Player</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="guitar"
                            onChange={(e) => this.setState({
                                guitar: e.target.checked
                              })} />
                        <span>Guitar</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="chords"
                            onChange={(e) => this.setState({
                                chords: e.target.checked
                              })} />
                        <span>Chords</span>
                    </label>

                </div>
                <div>
                    <button onClick={() => {
                        this.filter()
                    }}>Filter</button>
                </div>

                <div>
                    { this.state.filteredData !== [] ?  this.state.filteredData.map(item => {
                         return (
                            <div className={this.state.filter} key={item.id}>
                                <div>
                                    {item.id}
                                </div>
                                <div>{item.title}</div>
                                <div>{item.artist.name}</div>
                                <div>{item.tabTypes.map(item => `${item} `)}</div>
                            </div>
                        )}
                        ) : null
                    } 
                </div>

            </div>
        )
    }
}

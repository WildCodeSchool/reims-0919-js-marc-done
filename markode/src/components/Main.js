import React from 'react';
import Footer from './Footer';
import NavTools from './navTools/NavTools';
import Navbar from './Navbar'
import Highlighter from "react-highlight-words";

class Main extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            text: "",
            numChar: 0,
            input: ''
        }
        this.mdToHtml = this.mdToHtml.bind(this);
        this.countChar = this.countChar.bind(this);
        this.combinedMethods = this.combinedMethods.bind(this);
    }
    mdToHtml(event){
        const MarkdownIt = require('markdown-it')
        const md = new MarkdownIt();
        let text = event.target.value;
        let result = md.render(text);
        this.setState({
            text: result
        });
    }
    countChar(event){
        this.setState({numChar: event.target.value.length});
    }
    combinedMethods(e) {
        this.mdToHtml(e)
        this.countChar(e)
    }

    searchField = (event)=>{
        this.setState({input: event.target.value})
    }

    render() {
        return (
            <div>
                <header className="navbar">
                    <Navbar onSearch={this.onSearch} searchField={this.searchField} input={this.state.input} />
                </header>
                <div className="main">
                    <NavTools />
                    <div className="textBlocs">
                        <div className="mdBox">
                            <textarea 
                                className="textEditors"
                                onChange={this.combinedMethods}>
                            </textarea>
                            <button className="editorButtons">Effacer tout</button>                    
                        </div>
                        <div className="htmlBox">
                            <Highlighter 
                            className='textEditors'
                            searchWords={[this.state.input]}
                            textToHighlight={this.state.text}
                            />
                            <button className="editorButtons">Exporter</button>    
                        </div>
                    </div>
                    <Footer countChar={this.countChar} numChar={this.state.numChar}/>
                </div>
            </div>
        )
    }
}

export default Main;

import React from 'react';
import Footer from './Footer';
import NavTools from './navTools/NavTools';
import Navbar from './Navbar';
import Highlighter from 'react-highlight-words';
import { save } from 'save-file';
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      mdText: '',
      numChar: 0,
      countWord: 0,
      input: '',
      seoTool: []
    };
    this.mdToHtml = this.mdToHtml.bind(this);
    this.countChar = this.countChar.bind(this);
    this.combinedMethods = this.combinedMethods.bind(this);
    this.deleteMD = this.deleteMD.bind(this);
    this.seoTool = this.seoTool.bind(this);
    this.onClickAttribut = this.onClickAttribut.bind(this);
  }
  onClickAttribut(e) {
    this.setState({
      mdText: this.state.mdText + e.target.value,
      text: md.render(this.state.mdText + e.target.value)
    });
  }
  mdToHtml(event) {
    const MarkdownIt = require('markdown-it');
    const md = new MarkdownIt();
    let mdText = event.target.value;
    let result = md.render(mdText);
    this.setState({
      text: result,
      mdText
    });
  }
  countChar(event) {
    this.setState({ numChar: event.target.value.length });
  }
  counterWords(event) {
    let counttext = event.target.value;
    let table = counttext.split(/[\s|.|,|'|:|;|?|!|~|*|#|(|)|-|_|<|>]+/g);
    if (table[table.length - 1] === '') {
      table.splice(table.length - 1, 1);
    }
    let result = table.length;
    return result;
  }
  combinedMethods(e) {
    this.mdToHtml(e);
    this.countChar(e);
    this.handleCountWords(e);
  }
  handleCountWords(event) {
    this.setState({ countWord: this.counterWords(event) });
  }
  searchField = event => {
    this.setState({ input: event.target.value });
  };

  // combinedMethods(e) {
  //   this.mdToHtml(e);
  //   this.countChar(e);
  //   this.handleCountWords(e);
  // }
  handleCountWords(event) {
    this.setState({ countWord: this.counterWords(event) });
  }
  searchField = event => {
    this.setState({ input: event.target.value });
  };
  deleteMD() {
    this.setState({ mdText: '' });
  }
  onSearch = () => {
    let count = 0;
    let result;
    let input = this.state.input;
    let text = this.state.text;
    let table = text
      .split(/<\/?[a-z0-9]*>/g)
      .join('')
      .split(/[\s\.|\,|'|:|;|?|!|#]+/g);
    if (table[table.length - 1] === '') {
      table.splice(table.length - 1, 1);
    }
    for (let i = 0; i < table.length; i++) {
      if (input === table[i]) {
        count++;
      }
    }
    result = count;
    return result;
  };
  seoTool() {
    let text = this.state.text;
    let lowerCaseText = text.toLowerCase()
    let filters = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'p'];
    let endFilters = ['/h1', '/h2', '/h3', '/h4', '/h5', '/h6', '/a', '/p'];
    let result = [0, 0, 0, 0, 0, 0, 0, 0];
    let keyword = this.state.input;
    let table = lowerCaseText.split(/[\s|.|,|'|:|;|?|!|~|*|#|(|)|-|_||>|<]+/g);
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (table[i] === filters[j]) {
          let k = i;
          while (table[k] !== endFilters[j]) {
            k++;
          }
          for (let l = i; l <= k; l++) {
            if (table[l] === keyword) {
              result[j]++;
            }
          }
        }
      }
    }
    this.setState({ seoTool: result });
  }

    fileExport = () =>save(this.state.text, "fichier.html");

  render() {
    return (
      <div>
        <header className="navbar">
          <Navbar
            onSearch={this.onSearch}
            searchField={this.searchField}
            input={this.state.input}
          />
        </header>
        <div className="main">
          <NavTools onClickAttribut={this.onClickAttribut} />
          <div className="regroupBlocs">
            <div className="textBlocs">
              <div className="mdBox">
                <textarea
                  className="textEditors"
                  onChange={this.combinedMethods}
                  value={this.state.mdText}
                ></textarea>
                <button className="editorButtons" onClick={this.deleteMD}>
                  Effacer tout
                </button>
              </div>
              <div className="htmlBox">
                <Highlighter
                  className="textEditors"
                  autoEscape={true}
                  searchWords={[this.state.input]}
                  textToHighlight={this.state.text}
                />
                <button onClick={this.fileExport} className="editorButtons">Exporter</button>
              </div>
            </div>
            <Footer
              countChar={this.countChar}
              numChar={this.state.numChar}
              countWord={this.state.countWord}
              seoRes={this.state.seoTool}
              seoTool={this.seoTool}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

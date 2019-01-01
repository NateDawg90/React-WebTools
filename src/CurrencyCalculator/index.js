import React from 'react';
import { Button } from '@material-ui/core';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0.00',
      converted: '',
      data: {},
      from: '',
      to: '',
      result: ''
    };
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.convert = this.convert.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.getFromSymbol = this.getFromSymbol.bind(this);
    this.getToSymbol = this.getToSymbol.bind(this);
    this.resetValue = this.resetValue.bind(this);
    this.backspaceHandler = this.backspaceHandler.bind(this);
  }

  componentDidMount() {
    var path = 'https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json';
    loadJSON(path, resp => {
      var data = JSON.parse(resp);
      var from = Object.keys(data)[0];
      var to = Object.keys(data)[1];
      this.setState({ data, from, to });
    })

    setInputFilter(this.input, function(value) {
      return /^\d*\.?\d*$/.test(value);
    });
  }
  changeFrom(e) {
    e.preventDefault();
    var from = e.target.value;
    var result = '';
    this.setState({ from, result });
  }
  changeTo(e) {
    e.preventDefault();
    var to = e.target.value;
    var result = '';
    this.setState({ to, result });
  }
  changeAmount(e) {
    e.preventDefault();
    var parts = e.target.value.split('.');
    if (parts[0] !== '0' || parts[1][0] !== '0') {
      parts[0] = parts[0].concat(parts[1][0])
    }
    parts[1] = parts[1].slice(1);
    var value = parts.join('.');
    this.setState({ value });
  }
  convert(e) {
    e.preventDefault();
    var symbol = '';
    if (!window.fx.rates[this.state.from]) {
      symbol = this.getFromSymbol();
      this.setState({ result: symbol + ': Currency does not exist' })
    } else if (!window.fx.rates[this.state.to]) {
      symbol = this.getToSymbol();
      this.setState({ result: symbol + ': Currency does not exist' })
    } else {
      symbol = this.getToSymbol();
      var result = symbol + window.fx.convert(this.state.value, {from: this.state.from, to: this.state.to}).toFixed(2);
      this.setState({ result })
    }
  }
  getFromSymbol() {
    if (this.state.from) {
      return this.state.data[this.state.from].symbol_native;
    }
    return '$';
  }
  getToSymbol() {
    if (this.state.to) {
      return this.state.data[this.state.to].symbol_native;
    }
    return '';
  }
  resetValue(e) {
    this.setState({
      value: '0.00'
    })
  }
  backspaceHandler(e) {
    if (e.which === 8) {
      e.preventDefault();
      return false;
    }
  }
  
  render() {
    return (
      <div className='tc flex flex-column items-center '>
        <form className='flex justify-around items-center'>
          <span className='ml3'>{this.getFromSymbol()}</span>
          <input ref={input => this.input = input} step="0.01" 
            value={this.state.value} className='mh2 f3 gray' placeholder='0.00' 
            onChange={this.changeAmount} onFocus={this.resetValue} onKeyDown={this.backspaceHandler}  />
            <div className='mh3 flex flex-column justify-between items-start'>
              <span>FROM:</span>
              <span>TO:</span>

            </div>
            <div className='flex flex-column justify-around items-end mr3'>
              <select id='from' className='' onChange={this.changeFrom} value={this.state.from}>
                {Object.keys(this.state.data).map((key, idx) => {
                  return <option key={idx} value={key} >{key}</option>
                })}
              </select>
              <select id='to'  className='' onChange={this.changeTo} value={this.state.to}>
                {Object.keys(this.state.data).map((key, idx) => {
                  return <option key={idx} value={key} >{key}</option>
                })}
              </select>

            </div>
            <Button className='ml2' onClick={this.convert} variant='contained' color='primary'>Convert</Button>     
        </form>
        <div if={this.state.result} className='mt3 f3'>
          <span></span>{this.state.result}
        </div>
      </div>
    )
  }
};

const loadJSON = (path, callback) => {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null); 
}

const setInputFilter = (textbox, inputFilter) => {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

window.fx.base = "EUR";
loadJSON('http://data.fixer.io/api/latest?access_key=d0f3b7da0757140a192df5c5ee3fd3cf', (resp) => {
  var data = JSON.parse(resp);
  window.fx.rates = data.rates;
})

export default CurrencyConverter;
import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core';

class TitleScraper extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        loading: false,
        url: '',
        title: '',
        error: ''
      };
      this.scrape = this.scrape.bind(this);
      this.updateUrl = this.updateUrl.bind(this);
  }
    
  scrape(e) {
    e.preventDefault();
    this.setState({ loading: true });
    var title = '';
    var url = this.state.url;

    axios.get('https://' + url).then(res => {
      if(res.status === 200) {
        // find string enclosed within <title> and </title>
        var data = res.data;
        var startIndex, endIndex;
        for (var i = 0; i < data.length; i++) {
          if (data.slice(i, i + 7) === '<title>') {
            startIndex = i + 7;
          } else if (data.slice(i, i + 8) === '</title>') {
            endIndex = i;
            break;
          }
        }
        if (startIndex > 0 && endIndex > 0) {
          title = data.slice(startIndex, endIndex);
        }
        this.setState({ 
          loading: false,
          title: title,
          error: ''
        });
      }
    }).catch((error) => {
      error = 'Not a valid URL!';
      this.setState({ 
        loading: false,
        error 
      });
      return;
  })

  }
  updateUrl(e) {
    e.preventDefault();
    var url = e.target.value;
    this.setState({url})

  }

  render() {
    let output = '';
    if (this.state.loading) {
      return <div className='flex center'><CircularProgress className='mt5 center'/></div>;
    }

    if (this.state.error.length > 0) {
      output = <span className='flex red'><span className='mr4'>Error: </span>{this.state.error}</span>;
    } else if (this.state.title.length > 0) {
      output = <span className='flex'><span className='black-60 mr4'>Title: </span>{this.state.title}</span>;
    } else {
      output = <span className='flex black-60'><span className='black-100 mr4'>Title: </span>Empty</span>;
    }
    return (
      <div>
        <h2 className='flex justify-center'>Website Title Scraper</h2>
        <div>
          <form className="flex justify-between items-center mt3 grey" onSubmit={this.scrape}>
            <TextField 
              onChange={ this.updateUrl }
              id="standard-with-placeholder"
              label="Enter a URL"
              className='w-50'
              />     
            <div >
              <Button onClick={this.scrape} variant='contained' color='primary'>Scrape</Button>     
            </div>          
          </form>
        </div>
        <div className='mt3'>
          {output}
        </div>
      </div>
    );
  }
}

export default TitleScraper;

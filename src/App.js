import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SearchResultItem from './SearchResultItem';
import ConfigurableTable from './ConfigurableTable';
import TitleScraper from './TitleScraper/titlescraper';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 0,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };
  render() {
    var searchResult = {
      description: 'Digital marketing solutions designed to amplify performance and drive sustainable growth through multi-channel integration and cognitive technology.',
      title: 'Vulcan Search: Digital Marketing Solutions Powered by Data',
      url: 'https://vulcansearch.com'
    }
    let tab;
    if (this.state.activeTab === 0) {
      tab = (
        <div className='w-60 center mv4'>
          <h2 className='flex justify-center'>Search Result Item</h2>
          <SearchResultItem title={searchResult.title} url={searchResult.url} description={searchResult.description} />
        </div>
      )
    } else if (this.state.activeTab === 1) {
      tab = (
        <div className='w-60 center mv4'>
          <TitleScraper />
        </div>
      )
    } else {
      tab = (
        <div className='w-80 center mv4'>
          <h2 className='flex justify-center'>Configurable Table</h2>
          <ConfigurableTable  />
        </div>
      )
    }
    return (
      <div className="center flex flex-column">

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
            <Button color='inherit' href="https://www.vulcansearch.com" > Vulcan Search </Button>
             Coding Assignment
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="#1" />
            <Tab label="#2" />
            <Tab label="#3" />
          </Tabs>
        </Paper>
     
        {tab}
      </div>
    );
  }
}

export default App;

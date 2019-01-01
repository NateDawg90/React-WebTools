import React, { Component } from 'react';
import { Paper, Tabs, Tab, AppBar, Toolbar, Typography } from '@material-ui/core';

import SearchResultItem from './SearchResultItem';
import ConfigurableTable from './ConfigurableTable';
import TitleScraper from './TitleScraper/titlescraper';
import CurrencyConverter from './CurrencyCalculator';
import InfoButtons from './InfoButtons';

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
          <h2 className='flex justify-center'>Website Title Scraper</h2>
          <TitleScraper />
        </div>
      )
    } else if (this.state.activeTab === 2) {
      tab = (
        <div className='w-80 center mv4'>
          <h2 className='flex justify-center'>Configurable Table</h2>
          <ConfigurableTable  />
        </div>
      )
    } else {
      tab = (
        <div className='w-80 center mv4'>
          <h2 className='flex justify-center'>Currency Converter</h2>
          <CurrencyConverter  />
        </div>
      )
    }
    return (
      <div className="center flex flex-column">

        <AppBar position="static">
          <Toolbar className='flex justify-between'>
            <Typography variant="h6" color="inherit" className='tc'>
                Stateless Web Tools Demo
            </Typography>
            <InfoButtons />
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
            <Tab label="#4" />
          </Tabs>
        </Paper>
     
        {tab}
      </div>
    );
  }
}

export default App;

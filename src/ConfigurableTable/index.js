import React from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';

class ConfigurableTable extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        columnHeaders: ['column 1', 'column 2', 'column 3'],
        rows: [
          ['val1', 'val2', 'val3'], 
          ['val4', 'val5', 'val6'], 
          ['val7', 'val8', 'val9']
        ],
        sortedBy: 'header1',
        order: 'asc',
        query: '',
        headerInput: ''
      }
  
      this.sort = this.sort.bind(this);
      this.removeHeader = this.removeHeader.bind(this);
      this.addHeader = this.addHeader.bind(this);
      this.changeRows = this.changeRows.bind(this);
      this.updateHeaderField = this.updateHeaderField.bind(this);
  }

  sort(header) {

  }

  addHeader(e) {
    e.preventDefault();
    var headerInput = this.state.headerInput;
    if (headerInput) {
      var columnHeaders = this.state.columnHeaders;
      var rows = this.state.rows;

      columnHeaders.push(headerInput);
      _.each(rows, row => {
        row.push('0');
      })
      this.setState({
        columnHeaders,
        rows,
        headerInput: ''
      });
    }
  }
  updateHeaderField(e) {
    e.preventDefault();
    this.setState({ headerInput: e.target.value })
  }

  removeHeader(idx) {
    return (e) => {
      e.preventDefault();
      var columnHeaders = this.state.columnHeaders;
      var rows = this.state.rows;
      columnHeaders.splice(idx, 1);
      _.each(rows, row => {
        row.splice(idx, 1);
      })
      this.setState({ columnHeaders, rows });
    }
  }

  changeRows() {
    // this.setState({ columnHeaders });
  }
    
  render() {
    return (
      <div>
        <form className='mb3' onSubmit={this.addHeader}>
          <TextField 
            id="standard-with-placeholder"
            label="New column"
            className='w-50'
            onChange={this.updateHeaderField}
            />     
        </form>
        <div className='mb3 '>
          {this.state.columnHeaders.map((header, idx) => {
            return <Chip key={idx} label={header} onDelete={this.removeHeader(idx)} />
          })}
        </div>

        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                {this.state.columnHeaders.map((h, idx) => {
                  return <TableCell key={idx}>{h}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, idx) => {
                return (
                  <TableRow key={idx}>
                    {row.map((cell, idx2) => {
                      return <TableCell key={idx2} component="th" scope="row">{cell}</TableCell>
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>  
      </div>
  
    )
  }

}

export default ConfigurableTable;


import React from 'react';
import { TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Fab, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import _ from 'lodash';

class ConfigurableTable extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        columnHeaders: [],
        rows: [],
        filteredRows: [],
        filteredColumns: [],
        sortedBy: 'header1',
        order: 'asc',
        query: '',
        headerInput: '',
        newRow: [],
        err: ''
      }
  
      this.updateQuery = this.updateQuery.bind(this);
      this.removeColumn = this.removeColumn.bind(this);
      this.addHeader = this.addHeader.bind(this);
      this.updateHeaderField = this.updateHeaderField.bind(this);
      this.updateNewRow = this.updateNewRow.bind(this);
      this.addRow = this.addRow.bind(this);
      this.hideColumn = this.hideColumn.bind(this);
  }

  updateQuery(e) {
    var rows = _.cloneDeep(this.state.rows);
    var query = e.target.value;
    var filteredRows = _.filter(rows, (row) => {
      return _.some(row, (el) => {
        return _.includes(el, query);
      });
    })
    this.setState({
      filteredRows,
      query
    })
  }

  resetFilter() {
    var filteredRows = _.cloneDeep(this.state.rows);
    this.setState({
      filteredRows,
      query: ''
    })
  }

  addHeader(e) {
    e.preventDefault();
    var headerInput = this.state.headerInput;
    if (headerInput) {
      var columnHeaders = this.state.columnHeaders;
      var rows = _.cloneDeep(this.state.rows);
      var filteredRows = _.cloneDeep(this.state.filteredRows);
      var newRow = this.state.newRow;

      columnHeaders.push(headerInput);
      _.each(rows, (r, idx) => {
        r.push('');
      })
      _.each(filteredRows, row => {
        row.push('');
      })
      newRow.push('');
      this.setState({
        columnHeaders,
        rows: rows,
        filteredRows: filteredRows,
        headerInput: '',
        newRow
      });
    }
  }

  addRow(e) {
    e.preventDefault();
    if (_.some(this.state.newRow, ['length', 0])) {
      this.setState({ err: 'Assign values to all fields! '});
      return;
    }
    var rows = _.cloneDeep(this.state.rows);
    rows.push(this.state.newRow);
    var filteredRows = _.cloneDeep(this.state.filteredRows);
    filteredRows.push(_.cloneDeep(this.state.newRow));
    var newRow = _.map(this.state.newRow, (row) => { return ''});
    this.setState({ 
      rows,
      filteredRows,
      newRow,
    });
  }

  updateHeaderField(e) {
    e.preventDefault();
    this.setState({ headerInput: e.target.value })
  }

  updateNewRow = idx => e => {
    e.preventDefault();
    var newRow = this.state.newRow;
    newRow[idx] = e.target.value;
    this.setState({ newRow });
  }

  hideColumn = idx => e => {
    e.preventDefault();
    var filteredColumns = this.state.filteredColumns;
    filteredColumns.splice(idx, 1);
    this.setState({ filteredColumns });
  }

  removeColumn = idx => e => {
    e.preventDefault();
    var columnHeaders = this.state.columnHeaders;
    var rows = _.cloneDeep(this.state.rows);
    var filteredRows = _.cloneDeep(this.state.filteredRows);
    var newRow = this.state.newRow;
    columnHeaders.splice(idx, 1);
    _.each(rows, row => {
      row.splice(idx, 1);
    });
    _.each(filteredRows, r => {
      r.splice(idx, 1);
    });
    newRow.splice(idx, 1);
    this.setState({ columnHeaders, rows, newRow, filteredRows });
  }
    
  render() {
    return (
      <div>
        <div className='flex justify-between'>
          <form className='mb3 flex' onSubmit={this.addHeader}>
            <TextField 
              value={this.state.headerInput}
              id="standard-with-placeholder"
              label="New column"
              className=''
              onChange={this.updateHeaderField}
              />     
          </form>
          <TextField 
            value={this.state.query}
            id="standard-with-placeholder"
            label="Filter..."
            className=''
            onChange={this.updateQuery}
            />     
        </div>

        <div className='mb3 flex justify-center '>
          {this.state.columnHeaders.map((header, idx) => {
            return <Chip 
              avatar={
                <Avatar className='pointer' onClick={this.hideColumn(idx)}>
                  <VisibilityIcon />
                </Avatar>
              } 
              color='primary' key={idx} label={header} onDelete={this.removeColumn(idx)} />
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
              {this.state.filteredRows.map((row, idx) => {
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
        {/* for each column, have a text field below table */}
        <div className='w-100 flex justify-between'>
          {this.state.columnHeaders.map((h, idx) => {
            return (
                <TextField value={this.state.newRow[idx]} placeholder={this.state.columnHeaders[idx]} key={idx} onChange={this.updateNewRow(idx)}/>
            )
          })}
        </div>
        <div  className='mt3 flex justify-between items-center'>
          <span className='red'>{this.state.err}</span>
          <Fab onClick={this.addRow} color="primary" aria-label="Add" >
            <AddIcon />
          </Fab>
        </div>
      </div>
  
    )
  }
}

export default ConfigurableTable;


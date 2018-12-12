import React, {Component} from 'react';
import { Grid, Column } from '@sencha/ext-modern';
import model from '../../CompanyModel';

Ext.require([
    'Ext.grid.filters.*',
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
]);

export default class RowBodyGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: 'resources/data/CompanyData.json'
    } 
  });

  render() {
    return (
      <Grid
          title="Grid Filters"
          store={this.store}
          shadow
          plugins={{
              gridsummaryrow: true,
              gridfilters: true
          }}
      >
        <Column 
          text="Company" 
          dataIndex="name" 
          width="150"
          summaryRenderer={this.summarizeCompanies}
        />
        <Column 
          text="Price" 
          width="75" 
          dataIndex="price" 
          formatter="usMoney" 
          summary="average"
        />
        <Column 
          text="Change" 
          width="90" 
          dataIndex="priceChange" 
          renderer={this.renderSign.bind(this, '0.00')}
          summary="max" 
        />
        <Column 
          text="% Change" 
          width="100"
          dataIndex="priceChangePct" 
          renderer={this.renderSign.bind(this, '0.00')}
          summary="average" 
        />
        <Column 
          text="Last Updated" 
          width="125" 
          dataIndex="priceLastChange" 
          formatter="date('m/d/Y')" 
          summary="max"
        />
      </Grid>
    )
  }
  

  renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  )

  summarizeCompanies = (grid, context) => context.records.length + ' Companies';
}
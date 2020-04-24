import React from "react";
import './styles.css';
import {get} from "../../Service/request";
import getCountryISO2 from "country-iso-3-to-2";
import Selection from "../../components/Selection";
import _ from 'lodash';

export class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'VNM',
      countryList: {},
      regionFilter: 'country',
      dateFilter: 'total',
      statsData: {},
      loading: false
    }
  }
  
  componentDidMount() {
    this.getFirstLoad().then();
  }
  
  getFirstLoad = async () => {
    // get all country
    let getListCountry = await get('https://covid-api.com/api/regions');
    let optionsList = {};
    getListCountry.forEach(country => {
      optionsList[country.iso] = {
        label: country.name,
        icon: (getCountryISO2(country.iso) && `https://www.countryflags.io/${getCountryISO2(country.iso)}/flat/32.png`) || ''
      };
    });
    this.setState({
      countryList: optionsList
    })
    this.getStats().then();
  }
  
  changeCountry = (country) => {
    if (!this.state.loading) {
      this.setState({
        country: country
      }, () => {
        this.getStats().then();
      });
    }
  }
  
  changeDateFilter = (filter) => {
    if (!this.state.loading) {
      this.setState({
        dateFilter: filter
      }, () => {
        this.getStats().then();
      });
    }
  }
  
  
  changeRegionFilter = (filter) => {
    if (!this.state.loading) {
      this.setState({
        regionFilter: filter
      }, () => {
        this.getStats().then();
      });
    }
  }
  
  getStats = async () => {
    this.setState({
      loading: true
    })
    let path = '';
    if (this.state.regionFilter === 'global') {
      path = 'https://covid-api.com/api/reports/total?'
    }
    if (this.state.regionFilter === 'country') {
      path = `https://covid-api.com/api/reports?iso=${this.state.country}&`
    }
    if (this.state.dateFilter !== 'total') {
      path += `date=${this.getDateBy(this.state.dateFilter)}`;
    }
    let stats = await get(path);
    let newStats = {};
    // confirmed
    // deaths
    // recovered
    // active
    // fatality_rate
    if (Array.isArray(stats)) {
      newStats.confirmed = _.reduce(stats, (sum, item) => sum + item.confirmed, 0);
      newStats.deaths = _.reduce(stats, (sum, item) => sum + item.deaths, 0);
      newStats.recovered = _.reduce(stats, (sum, item) => sum + item.recovered, 0);
      newStats.active = _.reduce(stats, (sum, item) => sum + item.active, 0);
      newStats.fatality_rate = (_.reduce(stats, (sum, item) => sum + item.fatality_rate, 0) / (stats.length)).toFixed(2)*100;
    } else {
      newStats = stats;
      newStats.fatality_rate *= 100;
    }
    this.setState({
      statsData: newStats,
      loading: false
    })
  }
  
  getDateBy = (dateBy) => {
    let date = new Date();
    if (dateBy === 'yesterday') {
      date.setDate(date.getDate() - 1);
    }
    let month = date.getMonth();
    let day = date.getDate();
    return date.getFullYear() + '-' + ((month + 1) < 10 ? '0' : '') + (month + 1) + '-' + (day < 10 ? '0' : '') + day;
  }
  
  formatNumber = (number) => {
    let amount = number + '';
    const delimiter = ","; // replace comma if desired
    let a = amount.split('.', 2);
    let d = a[1] || '';
    let i = parseInt(a[0]);
    if (isNaN(i)) {
      return '';
    }
    let minus = '';
    if (i < 0) {
      minus = '-';
    }
    i = Math.abs(i);
    let n = String(i);
    a = [];
    while (n.length > 3) {
      let nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = n + '.' + d;
    }
    amount = minus + amount;
    return amount;
  }
  
  render() {
    return (
      <div className={'stats'}>
        <div className={'nav'}>
          <div
            className={'back item'}
            onClick={() => this.props.history.goBack()}
          />
          <div
            className={'notification item'}/>
        </div>
        <div className={'body'}>
          <h2>Thống kê</h2>
          <div className={'switch'}>
            <div className={'buttonGroup'}>
              {(this.state.regionFilter === 'country' &&
                <Selection
                  className={'selection'}
                  options={this.state.countryList}
                  value={this.state.country}
                  onChange={(value) => this.changeCountry(value)}
                />) ||
              (<span
                onClick={() => this.changeRegionFilter('country')}>
                Chọn quốc gia...
              </span>)}
              <div
                className={`global ${(this.state.regionFilter === 'global' && 'active') || ''}`}
                onClick={() => this.changeRegionFilter('global')}>
                Toàn cầu
              </div>
            </div>
            <div className={'overlay'}/>
          </div>
          <div className={'statistic'}>
            <div className={'statsFilter'}>
              <span
                onClick={() => this.changeDateFilter('total')}
                className={(this.state.dateFilter === 'total' && 'active') || ''}>Total</span>
              <span
                onClick={() => this.changeDateFilter('today')}
                className={(this.state.dateFilter === 'today' && 'active') || ''}>Today</span>
              <span
                onClick={() => this.changeDateFilter('yesterday')}
                className={(this.state.dateFilter === 'yesterday' && 'active') || ''}>Yesterday</span>
            </div>
            <div className={`flexStats ${(this.state.loading && 'loading') || ''}`}>
              <div className={'row1'}>
                <div className={'affected'}>
                  <label>Nhiễm</label>
                  <h2>
                    {(this.state.statsData &&
                      this.formatNumber(this.state.statsData.confirmed)) || 0}
                  </h2>
                </div>
                <div className={'death'}>
                  <label>Tử vong</label>
                  <h2>
                    {(this.state.statsData &&
                      this.formatNumber(this.state.statsData.deaths)) || 0}
                  </h2>
                </div>
              </div>
              <div className={'row2'}>
                <div className={'recover'}>
                  <label>Hồi phục</label>
                  <h2>
                    {(this.state.statsData &&
                      this.formatNumber(this.state.statsData.recovered)) || 0}
                  </h2>
                </div>
                <div className={'active'}>
                  <label>Chưa khỏi</label>
                  <h2>
                    {(this.state.statsData &&
                      this.formatNumber(this.state.statsData.active)) || 0}
                  </h2>
                </div>
                <div className={'serious'}>
                  <label>Tủ vong (%)</label>
                  <h2>
                    {(this.state.statsData &&
                      this.formatNumber(this.state.statsData.fatality_rate)) || 0}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      
      </div>
    )
  }
}

export default (Statistic);
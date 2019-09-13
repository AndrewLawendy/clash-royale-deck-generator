/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BarChart extends Component {
  componentDidMount() {
    setTimeout(() => {
      [...document.querySelectorAll('[data-basis]')].forEach((el) => {
        el.style.flexBasis = el.getAttribute('data-basis'); // eslint-disable-line no-param-reassign
      });
    }, 250);
  }

  render() {
    const { obj } = this.props;
    let { maximum } = this.props;
    if (!maximum) maximum = Object.keys(obj).reduce((acc, curr) => acc + obj[curr], 0);

    const getBasis = (val) => `${(val / maximum) * 100}%`;
    return (
      <ul className="bar-chart">
        {Object.keys(obj).map((key) => <li className="text-border" data-basis={getBasis(obj[key])} key={key} title={`${obj[key]} ${key}`}>{`${obj[key]} ${key}`}</li>)}
      </ul>
    );
  }
}

BarChart.defaultProps = {
  maximum: 0,
};

BarChart.propTypes = {
  obj: PropTypes.oneOfType([PropTypes.object]).isRequired,
  maximum: PropTypes.number,
};

export default BarChart;

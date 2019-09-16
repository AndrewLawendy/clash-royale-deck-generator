import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.setActiveIndex = this.setActiveIndex.bind(this);
  }

  setActiveIndex(index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { tabs, children } = this.props;
    const { activeIndex } = this.state;
    const childrenArr = React.Children.toArray(children);
    return (
      <div className="tabs">
        <ul className="tab-list">
          {tabs.map((tab, index) => (
            <li
              className={`tab-title ${activeIndex === index ? 'active' : ''}`}
              key={tab}
              onClick={() => (activeIndex !== index ? this.setActiveIndex(index) : '')}
              role="presentation"
            >
              {tab}
            </li>
          ))}
        </ul>
        <ul className="tab-content">
          {childrenArr.map((panel, index) => (
            <li className={`tab-panel ${activeIndex === index ? 'active' : ''}`} key={`for-${tabs[index]}`}>
              {panel}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Tabs.defaultProps = {
  tabs: [],
  children: [],
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

export default Tabs;

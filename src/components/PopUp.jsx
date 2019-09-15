/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { togglePopup } from '../actions/actions';


const mapStateToProps = (state) => {
  const { popupComponent } = state.commonReducer;
  return { popupComponent };
};

const mapDispatchToProps = (dispatch) => ({
  close: () => {
    document.getElementById('popup').classList.add('fade-out');
    setTimeout(() => {
      dispatch(togglePopup(false));
    }, 300);
  },
});

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.style.overflow = '';
  }

  handleEsc(e) {
    if (e.keyCode === 27) { // Esc
      const { close } = this.props;
      close();
    }
  }

  handleClick(e) {
    if (e.target === e.currentTarget) {
      const { close } = this.props;
      close();
    }
  }

  render() {
    const { popupComponent } = this.props;
    return (
      <div id="popup" onClick={this.handleClick} role="presentation">
        <div id="popup-body">
          <button type="button" className="text-header" id="popup-close" onClick={this.handleClick}>x</button>
          {popupComponent}
        </div>
      </div>
    );
  }
}

PopUp.defaultProps = {
  popupComponent: null,
};

PopUp.propTypes = {
  close: PropTypes.func.isRequired,
  popupComponent: PropTypes.node,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);

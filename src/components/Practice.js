import React, { Component } from 'react';

export class Practice extends Component {
  state = {
    currentIndex: 0,
    isFront: true,
  };

  handleCardFlip = () => {
    this.setState(state => ({
      isFront: !state.isFront,
    }));
  };

  handleNextCard = () => {
    const { cards } = this.props;
    this.setState(state => ({
      currentIndex: (state.currentIndex + 1) % cards.length,
    }));
  };

  handlePrevCard = () => {
    const { cards } = this.props;
    this.setState(state => ({
      currentIndex: (state.currentIndex - 1 + cards.length) % cards.length,
    }));
  };

  render() {
    const { cards } = this.props;
    const { currentIndex, isFront } = this.state;
    const { term = '', definition = '' } =
      cards && cards.length && cards[currentIndex];

    return (
      <div className="practiceContainer">
        <h3 className="practiceContainer_title">Practice</h3>
        <div className="practiceContainer_progress">
          {currentIndex + 1}/{cards.length}
        </div>
        <div className="practiceContainer_card">
          <div className="practiceContainer_term">
            {isFront ? term : definition}
          </div>
          <div className="practiceContainer_btns">
            <button type="button" className="btn" onClick={this.handleCardFlip}>
              {isFront ? 'Show back' : 'Show front'}
            </button>
            <div>
              <button
                type="button"
                className="btn"
                onClick={this.handlePrevCard}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn"
                onClick={this.handleNextCard}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

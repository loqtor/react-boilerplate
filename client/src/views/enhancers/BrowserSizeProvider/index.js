import React, { Component } from 'react';
import debounce from 'lodash.debounce';

const DEFAULT_DEBOUNCE = 100;

function BrowserSizeProvider(
  WrappedComponent,
  shouldDebounce = true,
  debounceTime = DEFAULT_DEBOUNCE,
) {
  return class extends Component {
    state = {
      windowWidth: 0,
      windowHeight: 0,
    };

    componentDidMount() {
      this.updateSizes();

      if (shouldDebounce) {
        this.resizeHandler = debounce(() => {
          this.updateSizes();
        }, debounceTime);
      } else {
        this.resizeHandler = this.updateSizes();
      }

      window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandler);
    }

    updateSizes() {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }

    render() {
      const { windowHeight, windowWidth } = this.state;

      return (
        <WrappedComponent {...this.props} windowWidth={windowWidth} windowHeight={windowHeight} />
      );
    }
  };
}

export default BrowserSizeProvider;

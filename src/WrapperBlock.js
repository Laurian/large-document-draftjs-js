import React, { Component } from 'react';
import { EditorBlock } from 'draft-js';
import VisibilitySensor from 'react-visibility-sensor';

class WrapperBlock extends Component {
  render() {
    const block = this.props.block;
    const key = block.getKey();

    return (
      <div className='WrapperBlock'>
        <small contentEditable={false}>block {key}</small>
        <VisibilitySensor intervalCheck={false} scrollCheck={true}>
          {({isVisible}) =>
            <div>{isVisible ? <EditorBlock {...this.props} /> : <span>...</span>}</div>
          }
        </VisibilitySensor>
      </div>
    );
  }
}

export default WrapperBlock;

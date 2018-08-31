import React, { Component } from 'react';
import Immutable from 'immutable';
import {Editor, EditorState, convertFromRaw, DefaultDraftBlockRenderMap} from 'draft-js';

import WrapperBlock from './WrapperBlock';

import content from './content'; // big text
import './App.css';

// make paragraphs
const blocks = content.split('\n\n').map(text => ({
  text,
  type: 'paragraph',
  data: {},
  entityRanges: [],
})).filter(({text}) => text.length > 0); // skip empty paragraphs

const blockRenderMap = Immutable.Map({
  paragraph: {
    element: 'section',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'paragraph') {
      return {
        component: WrapperBlock,
        // component: EditorBlock,
        props: {
          foo: 'bar'
        },
      };
    }
  };


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw({
        blocks,
        entityMap: {},
      })),
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        blockRenderMap={extendedBlockRenderMap}
        blockRendererFn={blockRenderer}
      />
    );
  }
}

export default App;

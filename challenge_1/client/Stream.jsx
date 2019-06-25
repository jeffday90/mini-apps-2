import React from 'react';
import StreamEntry from './StreamEntry.jsx';
import styled from 'styled-components';

const Feed = styled.div`
  margin-left: 150px;
  margin-right: 150px;
`;

const Stream = (props) => {
  return (
    <Feed>
      {props.results.map(result => <StreamEntry result={result}/>)}
    </Feed>
  )
}

export default Stream;
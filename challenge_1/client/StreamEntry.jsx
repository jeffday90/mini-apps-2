import React from 'react';
import styled from 'styled-components';

const Entry = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
  border: solid;
  border-radius: 5px 5px 5px 5px;
  padding: 10px;
  border-width: thin;
  text-align: left;
`;


const StreamEntry = (props) => {
  return (
    <Entry>
        <div>
          Date: {props.result.date}
        </div>
        <div>
          Description: {props.result.description}
        </div>
        <div>
            {/* Some entries do NOT have subheading... include? */}
          Subheading: {props.result.category2}
        </div>
    </Entry>
  )
}

export default StreamEntry;
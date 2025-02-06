import styled from 'styled-components';


export const Clause = styled.div`
  display: flex;

  .clause-number {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .clause-content {
    flex: 1;

    h4, ul {
      margin: 0;
      padding: 0;
    }
    
    p{
      display: inline;
    }
  }
`;



export const Mention = styled.span`
  background-color: ${props => props.color || 'transparent'};
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
`;

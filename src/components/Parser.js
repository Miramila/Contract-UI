import React from 'react';
import { Clause, Mention } from '../styles/styledComponents';

const Parser = ({ data }) => {
  let topLevelClauseCounter = 0;
  const renderContent = (content, parentClauseLabel = '', subCounter = 0) => {
    // Check if content is an array
    if (!content || !Array.isArray(content)) return null;

    let localSubCounter = subCounter;

    return content.map((item) => {
      // Render Plain Text
      if (!item.type && item.text) {
        return renderText(item);
      }

      // Render Items excluding Clause
      if (item.type !== 'clause') {
        return renderItem(item, parentClauseLabel, localSubCounter);
      }
      
      // Render Clause
      let clauseLabel;
      if (!parentClauseLabel) {
        topLevelClauseCounter += 1;
        clauseLabel = `${topLevelClauseCounter}.`;
      } else {
        localSubCounter += 1;
        clauseLabel = `(${String.fromCharCode(96 + localSubCounter)})`;
      }
      return renderClause(item, clauseLabel, parentClauseLabel, localSubCounter);
    });
  };

  const renderClause = (item, clauseLabel, parentClauseLabel, subCounter) => {
    const level = parentClauseLabel ? 1 : 0;

    return (
      <Clause>
        <div className="clause-number">{clauseLabel}</div>
        <div className="clause-content">
          {item.text ? renderText(item) : null}
          {item.children ? renderContent(item.children, clauseLabel, 0) : null}
        </div>
      </Clause>
    );
  };

  const renderItem = (item, parentClauseLabel, subCounter) => {
    const textPart = item.text ? renderText(item) : null;
    const childrenPart = item.children
      ? renderContent(item.children, parentClauseLabel, subCounter)
      : null;

    switch (item.type) {
      case 'h1':
        return <h1>{textPart}{childrenPart}</h1>;
      case 'h4':
        return <><h4>{textPart}</h4>{childrenPart}</>;
      case 'p':
        if (!textPart) {
          return <>{childrenPart}</>;
        }else{
          return <><p>{textPart}</p>{childrenPart}</>;
        }
      case 'block':
        return <div>{textPart}{childrenPart}</div>;
      case 'ul':
        return <ul>{textPart}{childrenPart}</ul>;
      case 'li':
        return <li>{textPart}{childrenPart}</li>;
      case 'lic':
        return <div>{textPart}{childrenPart}</div>;
      case 'mention':
        return (
          <Mention key={item.text || ''} color={item.color}>
            {textPart}{childrenPart}
          </Mention>
        );
      default:
        return textPart;
    }
  };

  const renderText = (text) => {
    if (!text) return '';
    if (Array.isArray(text)) {
      return text.map((t, i) => applyTextStyles(t, i));
    }
    return applyTextStyles(text);
  };

  const applyTextStyles = (t, key) => {
    if (!t.text) return null;
    const lines = t.text.split('\n');
    let styledText = lines.map((line, index) => (
      <React.Fragment key={`${key}-${index}`}>
        {index > 0 && <br />}
        {line}
      </React.Fragment>
    ));

    if (t.bold) styledText = <strong key={key}>{styledText}</strong>;
    if (t.underline) styledText = <u key={key}>{styledText}</u>;

    return styledText;
  };


  return <div>{renderContent(data)}</div>;
};

export default Parser;



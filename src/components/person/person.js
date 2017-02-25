import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper';

export class Person extends Component {
  render() {
    const {
      name,
      imageFilename,
      group,
      shouldShowName,
      overrideMaxWidth,
    } = this.props;

    const displayName = shouldShowName ? name : '???'
    const displayGroupLabel = group && 'Group: ';
    const displayGroupName = group && shouldShowName ? group : '???';

    const maxWidth = overrideMaxWidth ? overrideMaxWidth : '80vw';

    const overlayTitleStyle = {
      fontSize: overrideMaxWidth ? '16px' : '3vw',
      lineHeight: overrideMaxWidth ? '16px' : '3vw',
      maxHeight: '5vh',
      padding:'1px',
    };
    const cardMediaOverlay = {};
    if (shouldShowName) {
      cardMediaOverlay.overlay = (<CardTitle
        titleStyle={overlayTitleStyle}
        subtitleStyle={overlayTitleStyle}
        title={`Name: ${displayName}`}
        subtitle={`${displayGroupLabel}${displayGroupName}`} />)
    }

    const headshotStyle = {
      minHeight: '20vh',
      maxHeight: '40vh',
      width: 'auto',
      minWidth: '20vw',
      maxWidth: maxWidth,
    };

    const paperStyle = {
      margin: '5px',
      maxWidth: maxWidth,
      maxHeight: '45vh',      
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="Person">
        <Paper style={paperStyle} zDepth={2} >
          <Card>
            <CardMedia
              style={headshotStyle}
              {...cardMediaOverlay}
            >
              <img alt='headshot' style={headshotStyle} src={require(`../../images/${imageFilename}`)} />
            </CardMedia>
          </Card>
        </Paper>
      </div>
    );
  }
}

Person.PropTypes = {
  name: PropTypes.string.isRequired,
  imageFilename: PropTypes.string.isRequired,
  group: PropTypes.string,
  shouldShowName: PropTypes.bool.isRequired,
  overrideMaxWidth: PropTypes.number
};

export default Person;

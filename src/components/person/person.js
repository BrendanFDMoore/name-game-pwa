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
    } = this.props;

    const displayName = shouldShowName ? name : '???'
    const displayGroupLabel = group && 'Group: ';
    const displayGroupName = group && shouldShowName ? group : '???';

    const overlayTitle = ( shouldShowName &&
      <CardTitle
        title={`Name: ${displayName}`}
        subtitle={`${displayGroupLabel}${displayGroupName}`} />
    );
    const overlayTitleStyle = {
      fontSize: '3.5vw',
      lineHeight:'3.5vw',
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
      maxWidth: '80vw',
    };

    const paperStyle = {
      margin: '5px',
      maxWidth: '80vw',
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
};

export default Person;

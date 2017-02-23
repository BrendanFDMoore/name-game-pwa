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

    const cardMediaOverlay = {};
    if (shouldShowName) {
      cardMediaOverlay.overlay = (<CardTitle
        title={`Name: ${displayName}`}
        subtitle={`${displayGroupLabel}${displayGroupName}`} />)
    }

    const headshotStyle = {
      minHeight: '20vh',
      maxHeight: '50vh',
      width: 'auto',
      minWidth: '20vw',
      maxWidth: '90vw',
    };

    const paperStyle = {
      margin: '5px',
      maxWidth: '90vw',
      maxHeight: '50vh',      
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="Person">
        <Paper style={paperStyle} zDepth={2} >
          <Card>
            <CardMedia style={headshotStyle}
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

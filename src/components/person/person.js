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

    const headshotStyle = {
      minHeight: '30vh',
      maxHeight: '50vh',
      width: 'auto',
      minWidth: '30vh',
      maxWidth: '90vh',
    };

    const paperStyle = {
      maxWidth: '90vh',
      maxHeight: '50vh',      
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div className="Person">
        <Paper style={paperStyle} zDepth={2} >
          <Card>
            <CardMedia style={headshotStyle}
              overlay={<CardTitle title={`Name: ${displayName}`} subtitle={`${displayGroupLabel}${displayGroupName}`} />}
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

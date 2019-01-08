import React from 'react';
import { Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconSize = '3x';

const Tile = ({ handler, color, icon, caption }) => (
  <Button color={color} style={{ paddingTop: '20px', paddingBottom: '10px', width: '100%', color: 'white' }} onClick={handler}>
    <FontAwesomeIcon size={iconSize} icon={icon} />
    <h4>
      <strong>
        <Translate contentKey={caption}>{caption}</Translate>
      </strong>
    </h4>
  </Button>
);

export default Tile;

import React from 'react';
import { Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ handleFunction }) => (
    <div className="text-center">
        <Button id="go-back" onClick={handleFunction} color="info">
            <FontAwesomeIcon icon="arrow-left" />&nbsp;
      <Translate contentKey="entity.action.back">Back</Translate>
        </Button>
    </div>
);

export default BackButton;

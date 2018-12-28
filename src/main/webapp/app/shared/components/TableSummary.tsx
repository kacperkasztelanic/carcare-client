import React from 'react';
import { Translate } from 'react-jhipster';

const TableSummary = ({ totalItems }) => (
    <div>
        <hr
            style={{
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0
            }}
        />
        <p>
            <Translate contentKey="carcare.common.table-summary">Number of elements</Translate>:&nbsp;
    {totalItems}
        </p>
    </div>
);

export default TableSummary;

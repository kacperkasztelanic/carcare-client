import React from 'react';
import { Button, Form, FormGroup, Label, Table } from 'reactstrap';

export class Settings extends React.Component {

    render() {
        return (
            <div>
                <h1>Notifications</h1>
                <p>Select notifications you would like to receive via email:</p>
                <div className="paper generatedItems">
                    <Form>
                        <FormGroup>
                            <Label>
                                <h4>Najnowsze raporty</h4>
                            </Label>
                            <Table className="generatedTable">
                                chuj
                            </Table>
                        </FormGroup>
                    </Form>
                    <div className="generatedTable">
                        <Button size="sm" color="info">
                            Generuj
            </Button>{' '}
                    </div>
                </div>
            </div>
        );
    }
}

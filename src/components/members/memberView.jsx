import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'
import { Button, Card, ListGroup } from "react-bootstrap";
import MemberEditor from './memberEditor';
import { action } from 'mobx';

function memberView({ member }) {

    useEffect(() => {
        member.refresh();
    }, [member])

    const [isEditable, setIsEditable] = useState(false)


    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {member.firstname + ' ' + member.name.toUpperCase()}
                </Card.Title>
                <Card.Subtitle>
                    <Button onClick={() => setIsEditable(!isEditable)} size="sm" variant={isEditable ? "danger" : "success"}>{isEditable ? "Annuler" : "Modifier"}
                    </Button>
                </Card.Subtitle>
            </Card.Body>
            {isEditable ?
                <MemberEditor member={member} onMemberSaved={() => { setEditing(false) }} />
                :
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Prénom {member.firstname}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Nom {member.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Date de naissance {member.printableBirthday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Nompre de pret {member.numLoans}
                    </ListGroup.Item>
                </ListGroup>}
        </Card>
    )
}

export default observer(memberView)

import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react'
import RootStore from '../../RootStore';
import MemberView from '../../components/members/memberView';
import MemberAdd from '../../components/members/memberAdd'
import { ListGroup, Row, Col, Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Routes, Route, useParams } from 'react-router-dom'


const MemberLookUp = observer(() => {
    const { MemberManager } = useContext(RootStore)
    const { memberId } = useParams()
    const member = MemberManager.members.find((m) => m.id === memberId)

    return member
        ? <MemberView member={member} />
        : <Alert variant="danger">Membre inconnu !</Alert>

})

function MembersView() {
    const { MemberManager } = useContext(RootStore)

    const [addMemberOpen, setAddMemberOpen] = useState(false)

    return (
        <>
            <Row>
                <h1>Liste des membres</h1>
            </Row>
            <Row>
                <Col xs={12} sm={6} md={4}>
                    <ListGroup>
                        {
                            MemberManager.members.map(member => (
                                <LinkContainer key={member.id} to={member.id} onClick={() => setAddMemberOpen(false)}>
                                    <ListGroup.Item>
                                        {member.firstname + ' ' + member.name.toUpperCase()}
                                    </ListGroup.Item>
                                </LinkContainer>
                            ))
                        }
                    </ListGroup>
                    <Button onClick={() => setAddMemberOpen(!addMemberOpen)} className="mt-3">Ajouter un membre</Button>
                </Col>
                <Col>
                    {addMemberOpen ?
                        <MemberAdd close={() => setAddMemberOpen(false)}/>
                        :
                        <Routes>
                            <Route path=":memberId" element={<MemberLookUp />}></Route>
                        </Routes>
                    }

                </Col>
            </Row>
        </>
    )
}

export default observer(MembersView)
import React, { useEffect, useReducer } from 'react';
import {Button, Form } from "react-bootstrap";
import Member from '../../model/Members'

const dateToString = (d) => {
    if (d && d instanceof Date) {
        return d.toISOString().split('T')[0];
    }
    return d?.toString() ?? '';
}

const createState = (member) => {
    return {
        firstname: "",
        name: "",
        birthday: "",
        onSaving: false,
        erro: null,
    }
}

const reduceEditor = (state, action) => {
    switch (action?.type) {
        case 'reset':
            return createState(action.member)
        case 'set-firstname':
            return { ...state, firstname: action.firstname }
        case 'set-name':
            return { ...state, name: action.name }
        case 'set-birthday':
            return { ...state, birthday: action.birthday }
        case 'start-saving':
            return { ...state, onSaving: true, error: null }
        case 'stop-saving':
            return { ...state, onSaving: false, error: action.error }
        default:
            throw new Error(`Unmanaged reducer action'${action.type}`);
    }
}

const memberEditor = ({ close, onMemberSaved }) => {

    let member = {}
    const [state, dispatch] = useReducer(reduceEditor, member, createState)

    const submit = (e) => {
        e.preventDefault()
        if (!state.firstname || !state.name || !state.birthday) {
            console.warn('Cannot create. Missing data')
            return
        }
        dispatch({ type: 'start-saving' })
        Member.create({ firstname: state.firstname, name: state.name, birthday: state.birthday })
            .then(onMemberSaved)
            .catch((error) => {
                console.warn('Got an error', error);
                const message = error?.response?.data ?
                    `${error.response.data.error} : ${error.response.data.message}` :
                    'unknow error'
                dispatch({ type: 'stop-saving', error: message })
            })
    }

    return (
        <Form onSubmit={submit}>
            <fieldset disabled={state.onSaving}>
                <Form.Group className="mb-3" controlId="memberEditorFirstname">
                    <Form.Label>Prenom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Prénom"
                        required
                        value={state.firstname}
                        onChange={(e) => dispatch({ type: 'set-firstname', firstname: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="memberEditorName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nom"
                        required
                        value={state.name}
                        onChange={(e) => dispatch({ type: 'set-name', name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="memberEditorBirthday">
                    <Form.Label>Anniversaire</Form.Label>
                    <Form.Control
                        type="date"
                        required
                        value={state.birthday}
                        onChange={(e) => dispatch({ type: 'set-birthday', birthday: e.target.value })}
                    />
                </Form.Group>
            </fieldset>
            <Button type='submit' size="sm" variant= "primary" >Enregistrer</Button>
            <Button onClick={close} className="ms-3" size="sm" variant="danger" >Annuler</Button>
        </Form>
    )
}

export default memberEditor
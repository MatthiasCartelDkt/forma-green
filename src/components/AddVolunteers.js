import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { createVolunteer } from "../_functions/users/index"

export default function AddVolunteer() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const addressRef = useRef()
  const nameRef = useRef()
  const firstnameRef = useRef()
  const countryRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value).then((userCredentials) => {
        const user = userCredentials.user
        const newUser = {
          uid: user.uid,
          email: emailRef.current.value,
          address : addressRef.current.value,
          country: countryRef.current.value,
          name: nameRef.current.value,
          firstname: firstnameRef.current.value,
          subscription_active: true,
          subscription_date: Date.now(),
          subscription_duration: 2,
          type: 'volunteers',
          qr_code: `
          Name : ${nameRef.current.value}
          Address : ${addressRef.current.value}
          Country : ${countryRef.current.value}
          Type : volunteers
          Subscription date : ${Date.now()}
          Subscription active : "true"
          Subscription duration : ${2} years
          `
        }
        createVolunteer(newUser)
        window.location.reload()
      })
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add a new volunteer</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} required />
            </Form.Group>
            <Form.Group id="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="text" ref={firstnameRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" ref={countryRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Add the volunteer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

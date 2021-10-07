import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { createPartnership } from "../_functions/partnerships/index"

export default function AddVolunteer() {
  const nameRef = useRef()
  const giftsRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const newPartnership = {
        name: nameRef.current.value,
        gifts: giftsRef.current.value
    }

    try {
      setError("")
      await createPartnership(newPartnership)
      window.location.reload()
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add a new partnership</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Gifts</Form.Label>
              <Form.Control type="text" ref={giftsRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Add the partnership
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

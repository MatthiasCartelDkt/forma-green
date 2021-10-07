import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { addArea } from "../_functions/green_areas/index";

export default function AddGreanArea() {
  const longitudeRef = useRef()
  const latitudeRef = useRef()
  const addressRef = useRef()
  const sitenameRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const newGreenArea = {
      address: addressRef.current.value,
      position: [latitudeRef.current.value, longitudeRef.current.value],
      site_name: sitenameRef.current.value,
    }

    try {
      await addArea(newGreenArea)
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
          <h2 className="text-center mb-4">Add a green area</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Longitude</Form.Label>
              <Form.Control type="text" ref={longitudeRef} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Latitude</Form.Label>
              <Form.Control type="text" ref={latitudeRef} required />
            </Form.Group>
            <Form.Group id="firstname">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Site Name</Form.Label>
              <Form.Control type="text" ref={sitenameRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Add the green area
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

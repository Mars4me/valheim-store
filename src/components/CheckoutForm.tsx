import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

type CheckoutFormProps = {
  handleCheckout: () => void;
};

const CheckoutForm: FC<CheckoutFormProps> = ({ handleCheckout }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleCheckout();
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="checkoutForm">
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" {...register("firstName", { required: true, maxLength: 40 })} />
        <Form.Text className="text-muted">We'll never share your personal information.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
        <Form.Text className="text-muted">We'll never share your personal information.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" {...register("email", {required: true,  maxLength: 52 })} placeholder="youmail@example.com" />
        <Form.Text className="text-muted">We'll never share your personal information.</Form.Text>
      </Form.Group>
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="same-address" />
        <label className="custom-control-label ms-1" htmlFor="same-address">
          Don't notify me of new products.
        </label>
      </div>
      <hr className="mb-4" />
    </Form>
  );
};

export default CheckoutForm;

import React, { memo, useState } from 'react';
import { Form, FormField } from '../react-hooks-form';
import FieldError from '../components/FieldError';
import Submit from '../components/Submit';
import { validateEmail } from '../helpers/validation';

function handleSubmit() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

function UserInfoForm({ onSubmitSucceeded }) {
  return (
    <>
      <h3>Add your personal info</h3>
      <Form
        destroyOnUnmount={false}
        name="wizardForm"
        onSubmit={handleSubmit}
        onSubmitSucceed={onSubmitSucceeded}
      >
        <div className="form-row">
          <label>Email</label>
          <FormField
            component="input"
            name="userInfo.email"
            placeholder="Enter your email address"
            type="email"
            validate={validateEmail}
          />
          <FieldError name="userInfo.email" />
        </div>

        <div className="form-row">
          <label>Name</label>
          <FormField
            component="input"
            name="userInfo.name"
            placeholder="Enter your full name"
            type="name"
          />
        </div>

        <Submit text="Choose Plan" />
      </Form>
    </>
  );
}

function ChoosePlanForm({ onSubmitSucceeded }) {
  return (
    <>
      <h3>Choose a subscription plan</h3>
      <Form
        destroyOnUnmount={false}
        name="wizardForm"
        onSubmit={handleSubmit}
        onSubmitSucceed={onSubmitSucceeded}
      >
        <div className="form-row">
          <label>Gender</label>
          <label>
            <FormField
              component="input"
              name="plan.name"
              type="radio"
              value="free"
            />
            &nbsp; Free
          </label>
          <label>
            <FormField
              component="input"
              name="plan.name"
              type="radio"
              value="personal"
            />
            &nbsp; Personal
          </label>
          <label>
            <FormField
              component="input"
              name="plan.name"
              type="radio"
              value="organization"
            />
            &nbsp; Organization
          </label>
        </div>

        <Submit text="Secure Account" />
      </Form>
    </>
  );
}

function PaymentForm({ onSubmitSucceeded }) {
  return (
    <>
      <h3>Confirm Payment</h3>
      <Form
        destroyOnUnmount={false}
        name="wizardForm"
        onSubmit={handleSubmit}
        onSubmitSucceed={onSubmitSucceeded}
      >
        <Submit text="Pay with Credit Card" />
      </Form>
    </>
  );
}

function ExampleWizardForm() {
  const [step, setStep] = useState(1);

  const handleReset = () => {
  };

  return (
    <>
      {step === 1 && <UserInfoForm onSubmitSucceeded={() => setStep(2)} />}
      {step === 2 && <ChoosePlanForm onSubmitSucceeded={() => setStep(3)} />}
      {step === 3 && <PaymentForm onSubmitSucceeded={() => setStep(4)} />}
      {step === 4 && (
        <>
          <h3>Thank you for your subscription!</h3>
          <Submit onClick={handleReset} text="Do it again" type="button" />
        </>
      )}
    </>
  );
}

export default memo(ExampleWizardForm);

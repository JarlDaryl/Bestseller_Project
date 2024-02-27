import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function UserRegisterComponent() {

    const WhenIWantToSaveTheUser = (values) => {
        alert(JSON.stringify(values))
    }

  return (
    <div>
    <h1>Create your user</h1>
        <br />
    <div>
        <Formik 
        initialValues={{
            email:'',
            password:'',
            companyName:'',
            country:'',
        }}
        onSubmit={(values) => WhenIWantToSaveTheUser(values)}>


                {
                    ({}) => (<Form>
                        <div>
                            <label>Email</label>
                            <Field type='email' name='email' placeholder='Email...'/>
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field type='password' name='password' placeholder='Password...'/>
                            <ErrorMessage name='password' component='div' />
                        </div>
                        <div>
                            <label>Company Name</label>
                            <Field type='text' name='companyName' placeholder='Company...'/>
                            <ErrorMessage name='companyName' component='div' />
                        </div>
                        <div>
                            <label>Country</label>
                            <Field type='text' name='country' placeholder='Country...'/>
                            <ErrorMessage name='country' component='div' />
                        </div>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label='I agree to the terms and conditions' />
                            </FormGroup>
                        <Button type='submit' variant='contained'>Create Account</Button>
                    </Form>)
                }
        </Formik>
    </div>


    </div>
  )
}

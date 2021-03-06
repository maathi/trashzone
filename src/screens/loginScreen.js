import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Divider, Form, Message } from "semantic-ui-react"
import Loader from "../components/loader"
import FormContainer from "../components/formContainer"
import Meta from "../components/meta"
import { loginAction } from "../actions/userActions"

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState({})
  const [password, setPassword] = useState({})

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const loginHandler = async (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
  }

  return (
    <>
      <Meta title={"Login"} />
      <FormContainer>
        {error && <Message error list={[error]} />}
        <h1>Log in to your account</h1>
        <Form onSubmit={(e) => loginHandler(e)}>
          <Form.Input
            size="large"
            icon="user"
            iconPosition="left"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Input
            size="large"
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button color="black" type="submit" loading={loading}>
            Submit
          </Button>
        </Form>

        <Divider horizontal>
          <p>New Customer?</p>
        </Divider>
        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
          <Button basic>REGISTER</Button>
        </Link>
      </FormContainer>
    </>
  )
}

export default LoginScreen

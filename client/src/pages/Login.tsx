import { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <section className="login">
        <div className="login-container">
          <div className="login-row">
            <form className="login-form">
              <div className="login-form-heading">Login your account</div>
              <div className="login-form-subheading">Please login your credentials to continue.</div>
              <div className="login-form-wrapper">
                <div className="login-form-item">
                  <div className="login-form-label"></div>
                  <input type="text" name="email" className={`login-form-input`}
                    placeholder="Email" value={email}
                    onChange={formOnChange}
                  />
                </div>
                <div className="login-form-item">
                  <div className="login-form-label"></div>
                  <input type="password" name="password" className={`login-form-input`}
                    placeholder="Password" value={password}
                    onChange={formOnChange}
                  />
                </div>
                <div className="login-form-item">
                  <button className="login-form-button">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
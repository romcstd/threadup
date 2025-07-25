import { useState } from 'react'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <section className="register">
        <div className="register-container">
          <div className="register-row">
            <form className="register-form">
              <div className="register-form-heading">Create your account</div>
              <div className="register-form-subheading">It"s quick and easy.</div>
              <div className="register-form-wrapper">
                <div className="register-form-item">
                  <div className="register-form-label"></div>
                  <input type="text" name="name" className={`register-form-input`}
                    placeholder="Full Name" value={name}
                    onChange={formOnChange}
                  />
                </div>
                <div className="register-form-item">
                  <div className="register-form-label"></div>
                  <input type="text" name="email" className={`register-form-input`}
                    placeholder="Email" value={email}
                    onChange={formOnChange}
                  />
                </div>
                <div className="register-form-item">
                  <div className="register-form-label"></div>
                  <input type="password" name="password" className={`register-form-input`}
                    placeholder="Password" value={password}
                    onChange={formOnChange}
                  />
                </div>
                <div className="register-form-item">
                  <div className="register-form-label"></div>
                  <input type="password" name="confirmPassword" className={`register-form-input`}
                    placeholder="Confirm Password" value={confirmPassword}
                    onChange={formOnChange}
                  />
                </div>
                <div className="register-form-item">
                  <button className="register-form-button">Create a new account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useAuthStore } from '../features/auth/useAuthStore';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message, login, reset } = useAuthStore(
    (state) => ({
      user: state.user,
      isLoading: state.isLoading,
      isError: state.isError,
      isSuccess: state.isSuccess,
      message: state.message,
      login: state.login,
      reset: state.reset,
    })
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    reset();
  }, [user, isError, isSuccess, message, navigate, reset]);

  const formOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="login">
        <div className="login-container">
          <div className="login-row">
            <form className="login-form" onSubmit={formOnSubmit}>
              <div className="login-form-heading">Login your account</div>
              <div className="login-form-subheading">
                Please login your credentials to continue.
              </div>
              <div className="login-form-wrapper">
                <div className="login-form-item">
                  <div className="login-form-label"></div>
                  <input
                    type="text"
                    name="email"
                    className={`login-form-input`}
                    placeholder="Email"
                    value={email}
                    onChange={formOnChange}
                  />
                </div>
                <div className="login-form-item">
                  <div className="login-form-label"></div>
                  <input
                    type="password"
                    name="password"
                    className={`login-form-input`}
                    placeholder="Password"
                    value={password}
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

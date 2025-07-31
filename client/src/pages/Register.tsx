import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useAuthStore } from '../features/auth/useAuthStore';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message, register, reset } = useAuthStore(
    (state) => ({
      user: state.user,
      isLoading: state.isLoading,
      isError: state.isError,
      isSuccess: state.isSuccess,
      message: state.message,
      register: state.register,
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
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    await register({ name, email, password });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="register">
        <div className="register-container">
          <div className="register-row">
            <form className="register-form" onSubmit={formOnSubmit}>
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
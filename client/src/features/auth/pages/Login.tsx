import { useState } from "react";
import { assets } from "../../../assets/assets";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import Select, { SingleValue } from "react-select";
import apiClient from "../../../api/api-client";

type CountryOption = {
  value: string;
  label: string;
};

type registerData = {
  firstName: string | '';
  lastName: string | '';
  email: string | '';
  contactNumber : string | '';
  password: string | '';
  confirmPassword: string | '';
  country: string | '';
  role: string | '';
  status: number
}

const cricketCountries: CountryOption[] = [

  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "India", label: "India" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Australia", label: "Australia" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "South Africa", label: "South Africa" },
  { value: "England", label: "England" },
  { value: "Ireland", label: "Ireland" },
  { value: "Zimbabwe", label: "Zimbabwe" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "UAE", label: "UAE" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Oman", label: "Oman" },
  { value: "Nepal", label: "Nepal" },
];

const roleOptions = [
  { value: "Batsman", label: "Batsman" },
  { value: "Bowler", label: "Bowler" },
  { value: "Wicket Keeper", label: "Wicket Keeper" },
  { value: "Batting All Rounder", label: "Batting All Rounder" },
  { value: "Bowling All Rounder", label: "Bowling All Rounder" },
  { value: "Guest", label: "Guest" },
];


const Login = () => {
  const [state, setState] = useState<boolean>(true); // true = login, false = register

  const [registerData, setRegisterData] = useState<registerData>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    country: '',
    role: '',
    status : 0
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleCountryChange = (option: SingleValue<CountryOption>) => {
    setRegisterData((prev) => ({
      ...prev,
      country: option ? option.value : '',
    }));
  };
  
  const handleRoleChange = (option: SingleValue<{ value: string; label: string }>) => {
    setRegisterData((prev) => ({
      ...prev,
      role: option ? option.value : '',
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/register', registerData);
      console.log("Registration success:", response.data);
  
      setErrors({});
    } catch (error: any) {
      if (error.response?.data?.errorData) {
        setErrors(error.response.data.errorData);
      } else {
        console.error("Registration failed:", error);
      }
    }
  
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">

      <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full sm:w-[600px] max-h-[90vh] overflow-y-auto scrollbar-thin text-indigo-300 text-sm">

        <div className="flex justify-center mb-4">
          <img src={assets.logo} alt="logo" className="w-10 h-10 rounded-full cursor-pointer" />
        </div>

        <h2 className="text-3xl font-semibold text-white text-center mb-2">
          {state ? 'Login' : 'Create Account'}
        </h2>
        <p className="text-center mb-6 text-sm">
          {state ? 'Login to your account' : 'Create your account'}
        </p>

        <form onSubmit={handleSubmit}>

          {/* Dynamic form fields */}
          {state ? (
            <>
              {/* Login Fields */}
              <div className="flex mb-1 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                <MdEmail />
                <input type="text" name="email" className="bg-transparent outline-none w-full" placeholder="Enter your email" />
              </div>
              <span className="text-red-500 text-sm ml-2">Email is required</span>

              <div className="flex mt-4 mb-1 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                <RiLockPasswordFill />
                <input type="password" name="password" className="bg-transparent outline-none w-full" placeholder="Enter your password" />
              </div>
              <span className="text-red-500 text-sm ml-2">Password is required</span>

              <p className="mb-4 mt-2 ml-2 text-indigo-500 cursor-pointer">Forgot your password?</p>
            </>
          ) : (
            <>
                  {/* Register Fields – responsive 2 per row on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                        <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                          <FaUser />
                          <input
                            type="text"
                            name="firstName"
                            className="bg-transparent outline-none w-full text-white"
                            placeholder="Enter your first name"
                            value={registerData.firstName}
                            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          />
                        </div>
                        {errors.firstName 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.firstName}</span> )}
                    </div>

                    <div>
                        <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                          <FaUser />
                          <input
                            type="text"
                            name="lastName"
                            className="bg-transparent outline-none w-full text-white"
                            placeholder="Enter your last name"
                            value={registerData.lastName}
                            onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          />
                        </div>
                        {errors.lastName 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.lastName}</span> )}                    
                    </div>

                    <div>
                      <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <MdEmail />
                        <input
                          type="email"
                          name="email"
                          className="bg-transparent outline-none w-full text-white"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                      </div>
                      {errors.email 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.email}</span> )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <FaPhoneSquare />
                        <input
                          type="text"
                          name="contactNumber"
                          className="bg-transparent outline-none w-full text-white"
                          placeholder="Enter your contact number"
                          value={registerData.contactNumber}
                          onChange={(e) => setRegisterData({ ...registerData, contactNumber: e.target.value })}
                        />
                      </div>
                      {errors.contactNumber 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.contactNumber}</span> )}                    
                    </div>

                    <div>
                      <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <RiLockPasswordFill />
                        <input
                          type="password"
                          name="password"
                          className="bg-transparent outline-none w-full text-white"
                          placeholder="Enter your password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                      </div>
                      {errors.password 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.password}</span> )}                    
                    </div>

                    <div>
                      <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
                        <RiLockPasswordFill />
                        <input
                          type="password"
                          name="confirmPassword"
                          className="bg-transparent outline-none w-full text-white"
                          placeholder="Enter your confirm password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        />
                      </div>
                      {errors.password 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.password}</span> )}                    
                    </div>

                    <div>
                      <Select
                        options={cricketCountries}
                        value={cricketCountries.find(c => c.value === registerData.country) || null}
                        onChange={handleCountryChange}
                        placeholder="Select your country"
                        className="text-black"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: "9999px",
                            backgroundColor: "#333A5c",
                            border: "none",
                            paddingLeft: "10px",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "white",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#ccc",
                          }),
                          menu: (base) => ({
                            ...base,
                            color: "black",
                          }),
                        }}
                      />
                      {errors.country 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.country}</span> )}
                    </div>

                    <div>
                      <Select
                        options={roleOptions}
                        value={roleOptions.find(r => r.value === registerData.role) || null}
                        onChange={handleRoleChange}
                        placeholder="Select your role"
                        className="text-black"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: "9999px",
                            backgroundColor: "#333A5c",
                            border: "none",
                            paddingLeft: "10px",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "white",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#ccc",
                          }),
                          menu: (base) => ({
                            ...base,
                            color: "black",
                          }),
                        }}
                      />
                      {errors.role 
                            && ( <span className="text-red-500 text-sm ml-2">{errors.role}</span> )}                                        
                    </div>
                    <input type="hidden" value={registerData.status} />
                  </div>
                </>
          )}

          <button type="submit" className="w-full mt-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-start mt-4 text-white">
          {state ? "Don't have an account?" : "Already have an account?"}
          <span className="text-indigo-500 cursor-pointer ml-2" onClick={() => setState(!state)}>
            {state ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;

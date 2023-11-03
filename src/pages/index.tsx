import { useState } from "react"
import { Signin } from "../components/Auth/Signin"
import { Signup } from "../components/Auth/Signup"


const Login = () => {
  const [showSignin, setShowSignin] = useState(true)
  return (
    <div className="flex flex-row justify-items-center items-center">
      <div className="w-3/5">
        <div style={{ width: '500px' }} className="mx-auto">
          {showSignin ? <Signin goToSignUp={() => setShowSignin(false)} /> : <Signup goToSignIn={() => setShowSignin(true)} />
          }
        </div>
      </div>
      <div className="bg-cover bg-center h-screen w-2/5" style={{ backgroundImage: `url('https://cdn.onekindesign.com/wp-content/uploads/2017/01/Contemporary-Home-Design-Vertical-Arts-Architecture-01-1-Kindesign.jpg')` }} />
    </div>
  )
}

export default Login

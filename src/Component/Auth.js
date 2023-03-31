import { auth, provider } from "../firebase-configure.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookie = new Cookies();
export let Auth = (props) => {
  const signWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookie.set("auth-token", result.user.refreshToken);
      props.setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p>Sign In with Google To continue</p>
      <button onClick={signWithGoogle}>Sign In with Google</button>
    </div>
  );
};

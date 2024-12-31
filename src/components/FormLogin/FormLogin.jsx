import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { Fingerprint, KeyTwoTone } from "@mui/icons-material";

const FormLogin = () => {
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identify || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log({ identify, password });
    try {
      const user = await dispatch(loginUser({ identify, password }));
      if (user.data.roles.name === "admin") {
        navigate("/admin/home");
      } else if (user.data.roles.name === "customer") {
        navigate("/about");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main className="p-2 bg-white w-full border border-blue-400 shadow-sm shadow-blue-500 rounded-md">
        <section>
          <div className="py-4 flex flex-row justify-center items-center gap-1">
            <h1 className="text-3xl font-semibold text-center text-blue-500 uppercase">
              L
            </h1>
            <div className="rounded-full border-2 border-blue-400">
              <Fingerprint className="text-blue-400 " />
            </div>
            <h1 className="text-3xl font-semibold text-center text-blue-500 uppercase">
              GIN
            </h1>
          </div>
        </section>
        <section>
          <form className="flex flex-col gap-4 p-4">
            <div>
              <TextField
                id="identify"
                label="Identify"
                variant="standard"
                className="w-full"
                value={identify}
                onChange={(e) => setIdentify(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                variant="standard"
                className="w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {status === "failed" ? (
                <Alert variant="outlined" severity="error">
                  {status + ": " + error}
                </Alert>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-row justify-end">
              <Button
                disabled={!identify || !password ? true : false}
                onClick={handleSubmit}
                variant="contained"
                className="flex flex-row items-center justify-center gap-2"
              >
                {status == "loading" ? (
                  <>
                    <CircularProgress size="20px" color="white" />
                    <h1>loading...</h1>
                  </>
                ) : (
                  <>
                    <h1>Login</h1>
                    <KeyTwoTone />
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
export default FormLogin;

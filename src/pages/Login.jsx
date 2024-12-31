import FormLogin from "../components/FormLogin/FormLogin";

const Login = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen justify-center items-center">
        <div className="w-1/3 ">
          <FormLogin />
        </div>
      </main>
    </>
  );
};

export default Login;

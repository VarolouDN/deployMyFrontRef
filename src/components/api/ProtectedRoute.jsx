//ЕЩЕ НЕ ПРОВЕРЕНО ,ПРОСТО ВЗЯТО С КУРСА ШМИДТМАНА

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1.LOAD THE AUTHENTICATED USER

  const { user, isLoading, isAuthenticated } = useUser();

  //2.IF THERE IS NO AUTHENTICATED USER ,REDIRECT TO THE /login

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log(isAuthenticated, "isAuthenticated");
      console.log("false");
      console.log(isLoading, "isLoading");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //3.WHILE LOADING SHOW A SPINNER
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. THERE IS A USER ,RENDER THE APP
  console.log(user?.role);
  if (isAuthenticated) {
    console.log(isAuthenticated, "isAuthenticated");
    return children;
  }
}

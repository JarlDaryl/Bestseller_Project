import UserLoginPage from "./UserLoginPage";
import UserGlobalState from "../context/UserGlobalState";


export default function Home() {
  return (
    <UserGlobalState>
        <div>
      <h1>Welcome to BestSellet orders management dashboard!</h1>
        <UserLoginPage />
        </div>
    </UserGlobalState>
  );
}

import UserLoginPage from "./UserLoginPage";
import UserGlobalState from "../core/GlobalState";


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

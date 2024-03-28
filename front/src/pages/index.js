import UserLoginPage from "./UserLoginPage";
import HeaderMenuBarHomePageComponent from "@/component/HeaderMenuBar/HeaderMenuBarHomePageComponent";

export default function Home() {
  return (
    <>
      <div>
        <HeaderMenuBarHomePageComponent />
        <h1 className="homepage-h1">Welcome to BestSeller orders management dashboard</h1>
        <UserLoginPage />
      </div>
    </>
  );
}

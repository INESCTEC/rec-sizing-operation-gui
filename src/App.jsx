import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MainLayout from "./Main/MainLayout";
import "./index.scss";
import AuthProvider from "./Auth/AuthProvider";
import NotificationProvider from "./Notification/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Header />
        <MainLayout />
      </AuthProvider>
    </NotificationProvider>
  );
}
//<Footer />

export default App;

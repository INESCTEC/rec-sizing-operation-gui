import { User } from "@carbon/icons-react";
import styles from "./Auth.module.css";
import { useAuth } from "./AuthProvider";
import { Button } from "@carbon/react";

function Profile() {
  const auth = useAuth();
  //console.logauth);
  return (
    <>
      <div className="row flex-just-center">
        <div className="card-wrapper" style={{ width: "35rem" }}>
          <div className="card-header"></div>
          <div className="card-body">
            <div className="row flex-center flex-just-center">
              <User className={styles.icon} style={{ paddingRight: "8px" }} />
              <div>
                <p>
                  <span className="bold">Email:</span> {auth.user}
                </p>
              </div>
            </div>
            <div className="row flex-space-between mt-2">
              <Button className="primary-button" style={{width: "13rem"}}>Change Password</Button>
              <Button className="danger-button" style={{width: "13rem"}}>Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

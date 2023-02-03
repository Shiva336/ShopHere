function Admin() {
  let loginflag = localStorage.getItem("isLoggedIn");
  let curr_user;
  if (loginflag == "true") {
    curr_user = localStorage.getItem("loggedUser");
  }
  return (
    <div>
      {curr_user === "admin" && <div>admin</div>}
      {curr_user !== "admin" && <div>Not an admin!</div>}
    </div>
  );
}

export default Admin;

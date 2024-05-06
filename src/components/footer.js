

function AppFooter() {
  return (
    <>
        <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
        <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
        <li className="nav-item"><a href="/auth" className="nav-link px-2 text-body-secondary">Log in or Register</a></li>
        <li className="nav-item"><a href="/support" className="nav-link px-2 text-body-secondary">Support</a></li>
        <li className="nav-item"><a href="/donate" className="nav-link px-2 text-body-secondary">Donate</a></li>
        </ul>
        <p className="text-center text-body-secondary">{new Date().getFullYear()} ©Haroldas Varanauskas</p>
        </footer>
    </>
   
  );
}

export default AppFooter;
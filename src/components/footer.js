

function AppFooter() {
  return (
    <>
        <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="/" class="nav-link px-2 text-body-secondary">Home</a></li>
        <li class="nav-item"><a href="/about" class="nav-link px-2 text-body-secondary">About</a></li>
        <li class="nav-item"><a href="/auth" class="nav-link px-2 text-body-secondary">Log in or Register</a></li>
        <li class="nav-item"><a href="/support" class="nav-link px-2 text-body-secondary">Support</a></li>
        <li class="nav-item"><a href="/donate" class="nav-link px-2 text-body-secondary">Donate</a></li>
        </ul>
        <p class="text-center text-body-secondary">{new Date().getFullYear()} ©Haroldas Varanauskas</p>
        </footer>
    </>
   
  );
}

export default AppFooter;
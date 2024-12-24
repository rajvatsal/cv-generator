import "./Header.scss";

export function Header() {
  return(
    <header className="header">
        <img className="header__icn" src="/Logo.svg" alt="logo" />
        <h1 className="header__title">CV GENERATOR</h1>
        <span className="header__desc">Create A Professional CV In Seconds</span>
    </header>
  );
}

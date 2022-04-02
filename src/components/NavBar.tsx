import React from 'react'

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <a className="navbar-brand lead" href="/">
          Мои контакты &nbsp;
          <i className="bi bi-person-circle navbar-brand" />
        </a>
      </div>
    </nav>
  )
}

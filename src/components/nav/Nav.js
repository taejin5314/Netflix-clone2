import React, { useEffect, useState } from 'react';
import './Nav.css'

function Nav() {

    const [Show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                setShow(true);
            } else setShow(false);
        });
        return () => {
            window.removeEventListener('scroll')
        };
    }, []);

    return (
        <div className={`nav ${Show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img
                className="nav__avatar"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                alt="Netflix Avatar"
            />
        </div>
    )
}

export default Nav

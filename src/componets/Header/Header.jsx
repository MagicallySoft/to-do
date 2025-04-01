import React from "react";
import magically from '../../assets/magically-logo.svg';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="d-flex px-4 py-2 align-items-center justify-content-center">
                            {/* Removed the commented-out code */}
                            <div 
                                style={{
                                    cursor: "pointer",
                                    marginLeft: '20px'
                                }} 
                                onClick={() => {
                                    window.open("https://magicallysoft.com/", "_blank");
                                }}
                            >
                                <img 
                                    src={magically} 
                                    alt="magically Logo" 
                                    className="d-inline-block mt-2" 
                                    width={236}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;

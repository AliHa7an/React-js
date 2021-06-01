import React from 'react'
import '../../style/login.css'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    const { className } = props
    const buttonClass = className || "button"
    return (
        <button {...props}  className={buttonClass} />
    )
}

export default React.memo(Button)
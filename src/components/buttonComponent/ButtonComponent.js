import React from 'react'
import '../../style/login.css'

const Button = props => {
    const { className } = props
    const buttonClass = className || "button"

    return (
        <button className={buttonClass} {...props} />
    )
}

export default React.memo(Button)
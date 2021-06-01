import React, { forwardRef } from 'react'


interface IInputFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    icon: string
}
// type InputProps = JSX.IntrinsicElements["input"]
// type InputProps = React.HTMLProps<HTMLInputElement>

const InputField  = forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
    const { icon} = props
    const iconClass = 'fa fa-' + icon + ' icon'
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text"><i className={iconClass}></i></span>
            </div>
            <input   {...props}   ref={ref}  className="form-control" />
        </div>
    )
}
)
export default React.memo(InputField)


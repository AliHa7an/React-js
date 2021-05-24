import React, { forwardRef } from 'react'


const InputField = forwardRef((props, ref) => {
    const { icon } = props
    const iconClass = 'fa fa-' + icon + ' icon'
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text text-primary"><i className={iconClass}></i></span>
            </div>
            <input className="form-control" ref={ref} {...props} />
        </div>
    )
}
)
export default React.memo(InputField)


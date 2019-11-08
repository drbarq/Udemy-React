import React from 'react'

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null 
    const inputClasses = [styles.InputElement]
    // let validationError = null

    if (props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(styles.Invalid)
    }

    // if (props.invalid && props.touched) {
    //     validationError = <p className={styles.ValidationError}>{props.errorMessage}</p>
    // }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                // className={styles.InputElement} 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('textarea'):
            inputElement = <textarea 
                className={styles.InputElement}  
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('select'): 
            inputElement = (
                <select 
                    className={styles.InputElement}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option 
                            value={option.value}
                            key={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = <input 
                className={styles.InputElement}  
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {/* {validationError} */}
        </div>
    )
}

export default input
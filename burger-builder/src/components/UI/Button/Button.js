import React from 'react'
import styles from './Button.module.css'

const button = () => (
    <button
        onClick={props.clicked}
        styles={[styles.Button, style[props.btnType]].join(' ')}
    >
        {props.children}
    </button>
)

export defualt button
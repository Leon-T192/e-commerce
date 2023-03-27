import React from 'react'

const FormErrors = (props) => {

    function renderError() {
        let {errors} = props
        if(Object.keys(errors).length > 0){
          return Object.keys(errors).map((keys, index) => {
            return (
              <li key={index}>{errors[keys]}</li>
            )
          })
        }
      }

    return (
        <div>
            {renderError()}
        </div>
    )
}

export default FormErrors;
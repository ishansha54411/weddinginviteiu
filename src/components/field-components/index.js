export const renderTextInput = ({ id, input, meta, name, placeholder, faIcon, type }) => {
    var inputClass=''
    if(input.value!==''){
        inputClass='has-val';
    }
    let showError;
    if(meta.touched && meta.error){
        showError=true;
    }
    return (
        <>
            <div className={`wrap-input100 validate-input ${showError ? 'alert-validate' : ''}`} data-validate={meta.error}>
                <input autocomplete="off" id={id} className={`input100 ${inputClass}`} type="text" name={name} type={type} onChange={input.onChange} value={input.value}/>
                <span className="focus-input100"></span>
                <span className="label-input100">{placeholder}</span>
            </div>
            {renderError(meta)}
        </>
    );
}
const renderError = ({ touched, error }) => {
    if (touched && error) {
        return (
            <span className="error invalid-feedback" style={{ display: 'block' }}>
                {error}
            </span>
        )
    }
}
 
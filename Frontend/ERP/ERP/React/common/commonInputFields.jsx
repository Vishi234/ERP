var CreateInput = React.createClass({
    //onchange event
    handleChange: function (e) {
        this.props.onChange(e.target.value);
        var isValidField = this.isValid(e.target);
    },
    handleBlur: function (e) {
        this.props.onBlur(e.target.value);
        var isValidField = this.isValid(e.target);
    },
    //validation function
    isValid: function (input) {
        //check required field
        if (input.getAttribute('required') != null && input.value === "") {
            input.classList.add('input-validation-error'); //add class error
            input.nextSibling.classList.add('field-validation-error');
            input.nextSibling.textContent = this.props.messageRequired; // show error message
            return false;
        }
        else {
            input.classList.remove('input-validation-error');
            input.nextSibling.classList.remove('field-validation-error');
            input.nextSibling.textContent = "";
            return true;
        }
    },
    componentDidMount: function () {
        if (this.props.onComponentMounted) {          
            this.props.onComponentMounted(this); //register this input in the form
        }
        InitializeDate("daterangepicker");
    },
    render: function () {
        var inputField;
        if (this.props.type == 'textarea') {
            inputField = <textarea value={this.props.value} ref={this.props.name} name={this.props.name}
                                   className='registration-form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        else if (this.props.type == 'ddl') {
            inputField = <select value={this.props.value} ref={this.props.name} name={this.props.name}
                className='registration-form-control dropdown' required={this.props.isrequired} onChange={this.handleChange} >
                {this.props.value.map((obj) => <option key={obj[this.props.keyId]} value={obj[this.props.keyId]}>{obj[this.props.keyName]}</option>)}
                </select>
            
        }
        else if (this.props.type == 'multiSelect') {
            inputField = <select value={this.props.value} ref={this.props.name} name={this.props.name}
                                 className='registration-form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        else if (this.props.type == 'date') {
            inputField = <input type="text" id={this.props.id} value={this.props.value} ref={this.props.name} readOnly autoComplete="off" name={this.props.name}
                                className={this.props.className} required={this.props.isrequired} onBlur={this.handleBlur} />
        }
        else {
            if (this.props.name == "academicYear") {
                inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} autoComplete="off" name={this.props.name}
                                    className={this.props.className} required={this.props.isrequired} onChange={this.handleChange} />
            }
            else {
                inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} autoComplete="off" name={this.props.name}
                                    className={this.props.className} required={this.props.isrequired} onChange={this.handleChange} />
            }

        }
        return (
            <div className={this.props.type}>
                <div className="form-group">
                    <label htmlFor={this.props.htmlFor}>{this.props.label}:</label>{inputField}
                    <span className="field-validation-error"></span>
                </div>
                <span className="calendarbase"><img src="../../Images/calendar.png" /></span>
            </div>
        );
    }
});

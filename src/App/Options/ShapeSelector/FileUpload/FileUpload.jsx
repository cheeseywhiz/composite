import React from 'react';
import style from './FileUpload.css';

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        const {onFilesChange, onFileChange} = this.props;
        const files = this.fileInput.current.files;
        if (!files.length) return;
        onFilesChange(files);
        onFileChange(files[0]);
    }

    prompt() {
        this.fileInput.current.click();
    }

    render() {
        const {onFilesChange, onFileChange, ...props} = this.props;
        return <input
            ref={this.fileInput}
            type='file'
            className={style.fileInput}
            onChange={this.onChange}
            {...props} />
    }
}

FileUpload.defaultProps = {
    onFileChange: (file) => {},
    onFilesChange: (files) => {},
};
